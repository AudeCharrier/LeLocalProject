import type { RequestHandler } from "express";

import databaseLeLocal from "../../../database/client";
import activityRepository from "../activity/activityRepository";
import spaceRepository from "../space/spaceRepository";

type BookingPayload = {
  space_id: number;
  time_slot_id: number | null;
  start_date: string;
  end_date: string;
  seats: number | null;
  months: number | null;
  users_id: number;
  total_price: number;
  name?: string;
  email?: string;
};

const DEFAULT_TIME_SLOT_ID = 4;

const add: RequestHandler = async (req, res, next) => {
  const body = req.body as BookingPayload;

  if (!body.space_id || !body.start_date || !body.end_date || !body.users_id) {
    res.status(400).json({ message: "Champs requis manquants" });
    return;
  }

  const effectiveTimeSlotId = body.time_slot_id ?? DEFAULT_TIME_SLOT_ID;
  const quantity = body.seats ?? 1;

  if (quantity < 1) {
    res.status(400).json({ message: "Quantité invalide" });
    return;
  }

  const connection = await databaseLeLocal.getConnection();

  try {
    await connection.beginTransaction();

    const space = await spaceRepository.readForUpdate(
      connection,
      body.space_id,
    );
    if (space == null) {
      await connection.rollback();
      res.status(404).json({ message: "Espace introuvable" });
      return;
    }

    const isOpenSpace = space.space_category.toLowerCase().includes("open");
    const isLocal = space.space_category === "Local vide";

    if (isLocal) {
      const overlapping = await spaceRepository.hasOverlappingDateRange(
        connection,
        body.space_id,
        body.start_date,
        body.end_date,
      );
      if (overlapping) {
        await connection.rollback();
        res.status(409).json({
          message:
            "Ce local est déjà réservé sur une période qui chevauche les dates demandées",
        });
        return;
      }

      const activity = await activityRepository.create({
        timeSlotId: effectiveTimeSlotId,
        spaceId: body.space_id,
        startDate: body.start_date,
        endDate: body.end_date,
        priceUnit: space.price_unit,
        urlImage: space.url_image,
      });

      const [result] = await connection.query(
        `INSERT INTO cart (quantity, total_price, users_id, id_activity)
         VALUES (?, ?, ?, ?)`,
        [quantity, body.total_price, body.users_id, activity.id],
      );

      await connection.commit();
      res.status(201).json({
        cartItemId: (result as { insertId: number }).insertId,
        activityId: activity.id,
      });
      return;
    }

    if (!isOpenSpace) {
      const taken = await spaceRepository.isSlotTaken(
        connection,
        body.space_id,
        body.start_date,
        effectiveTimeSlotId,
      );
      if (taken) {
        await connection.rollback();
        res.status(409).json({
          message: "Ce créneau est déjà réservé pour cet espace",
        });
        return;
      }

      const activity = await activityRepository.findOrCreate(connection, {
        timeSlotId: effectiveTimeSlotId,
        spaceId: body.space_id,
        startDate: body.start_date,
        endDate: body.end_date,
        priceUnit: space.price_unit,
        urlImage: space.url_image,
      });

      const [result] = await connection.query(
        `INSERT INTO cart (quantity, total_price, users_id, id_activity)
         VALUES (?, ?, ?, ?)`,
        [quantity, body.total_price, body.users_id, activity.id],
      );

      await connection.commit();
      res.status(201).json({
        cartItemId: (result as { insertId: number }).insertId,
        activityId: activity.id,
      });
      return;
    }

    const activity = await activityRepository.findOrCreate(connection, {
      timeSlotId: effectiveTimeSlotId,
      spaceId: body.space_id,
      startDate: body.start_date,
      endDate: body.end_date,
      priceUnit: space.price_unit,
      urlImage: space.url_image,
    });

    const booked = await spaceRepository.countBookedSeats(
      connection,
      body.space_id,
      body.start_date,
      effectiveTimeSlotId,
    );
    const available = Math.max(space.capacity - booked, 0);

    if (quantity > available) {
      await connection.rollback();
      res.status(409).json({
        message:
          available > 0
            ? `Plus que ${available} place${available > 1 ? "s" : ""} disponible${available > 1 ? "s" : ""} pour ce créneau`
            : "Plus aucune place disponible pour ce créneau",
        available,
      });
      return;
    }

    const [result] = await connection.query(
      `INSERT INTO cart (quantity, total_price, users_id, id_activity)
       VALUES (?, ?, ?, ?)`,
      [quantity, body.total_price, body.users_id, activity.id],
    );

    await connection.commit();

    res.status(201).json({
      cartItemId: (result as { insertId: number }).insertId,
      activityId: activity.id,
    });
  } catch (err) {
    await connection.rollback();
    next(err);
  } finally {
    connection.release();
  }
};

export default { add };
