// spaceActions.ts
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
    const { date, timeSlotId, endDate } = req.query;

    if (!date) {
      res.status(400).json({ message: "date est requis" });
      return;
    }

    const space = await spaceRepository.read(spaceId);
    if (space == null) {
      res.sendStatus(404);
      return;
    }

    const isOpenSpace = space.space_category.toLowerCase().includes("open");
    const isLocal = space.space_category === "Local vide";

    // --- Cas "Local vide" : réservation sur une plage de dates ---
    if (isLocal) {
      if (!endDate) {
        res
          .status(400)
          .json({ message: "endDate est requis pour un local vide" });
        return;
      }
      const overlapping = await spaceRepository.hasOverlappingDateRange(
        databaseLeLocal,
        spaceId,
        String(date),
        String(endDate),
      );
      res.json({
        spaceId,
        startDate: String(date),
        endDate: String(endDate),
        available: overlapping ? 0 : 1,
      });
      return;
    }

    if (!timeSlotId) {
      res.status(400).json({ message: "timeSlotId est requis" });
      return;
    }

    // --- Cas espace "exclusif" (salle de réunion, studio, etc.) ---
    if (!isOpenSpace) {
      const taken = await spaceRepository.isSlotTaken(
        databaseLeLocal,
        spaceId,
        String(date),
        Number(timeSlotId),
      );
      res.json({
        spaceId,
        date: String(date),
        timeSlotId: Number(timeSlotId),
        available: taken ? 0 : 1,
      });
      return;
    }

    // --- Cas espace "open" : plusieurs places par créneau ---
    // CORRECTION : on utilise getOverlappingSlotIds via isSlotTaken n'est pas adapté ici,
    // donc on passe par countBookedSeats qui gère les conflits Journée ↔ Matin/Après-midi
    const bookedSeats = await spaceRepository.countBookedSeats(
      databaseLeLocal,
      spaceId,
      String(date),
      Number(timeSlotId),
    );

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
