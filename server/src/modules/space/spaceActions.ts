import type { RequestHandler } from "express";

import databaseLeLocal from "../../../database/client";
import type { Rows } from "../../../database/client";
import spaceRepository from "./spaceRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const spaces = await spaceRepository.readAll();
    res.json(spaces);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const itemId = Number(req.params.id);
    const item = await spaceRepository.read(itemId);
    if (item == null) {
      res.sendStatus(404);
    } else {
      res.json(item);
    }
  } catch (err) {
    next(err);
  }
};

const readAvailability: RequestHandler = async (req, res, next) => {
  try {
    const spaceId = Number(req.params.id);
    const { date, timeSlotId } = req.query;

    if (!date || !timeSlotId) {
      res.status(400).json({ message: "date et timeSlotId sont requis" });
      return;
    }

    const space = await spaceRepository.read(spaceId);
    if (space == null) {
      res.sendStatus(404);
      return;
    }

    const [rows] = await databaseLeLocal.query<Rows>(
      `SELECT COALESCE(SUM(c.quantity), 0) AS booked
       FROM activity a
       LEFT JOIN cart c ON c.id_activity = a.id
       WHERE a.space_id = ? AND a.start_date = ? AND a.time_slot_id = ?`,
      [spaceId, String(date), Number(timeSlotId)],
    );
    const bookedSeats = Number((rows[0] as { booked: number })?.booked) || 0;

    const available = Math.max(space.capacity - bookedSeats, 0);

    res.json({
      spaceId,
      date: String(date),
      timeSlotId: Number(timeSlotId),
      capacity: space.capacity,
      booked: bookedSeats,
      available,
    });
  } catch (err) {
    next(err);
  }
};

export default { browse, read, readAvailability };
