import type { RequestHandler } from "express";

import databaseLeLocal from "../../../database/client";
import type { Rows } from "../../../database/client";
import spaceRepository from "./spaceRepository";

/**
 * GET /api/spaces
 * Renvoie la liste de tous les espaces disponibles à la réservation.
 */
const browse: RequestHandler = async (req, res, next) => {
  try {
    const spaces = await spaceRepository.readAll();
    res.json(spaces);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/spaces/:id
 * Renvoie le détail d'un espace précis, ou 404 s'il n'existe pas.
 */
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

/**
 * GET /api/spaces/:id/availability
 * Calcule la disponibilité d'un espace pour une date donnée (et un créneau, ou une plage de dates selon le type d'espace).
 *
 * Le comportement diffère selon la catégorie de l'espace :
 * - "Local vide" : réservation sur une PLAGE de dates (start/end). On vérifie simplement si la période demandée chevauche une réservation existante. `available` vaut 0 ou 1 (tout ou rien, pas de notion de places).
 * - Espace "exclusif" (ni open, ni local) : réservation par CRÉNEAU horaire, un seul occupant possible par créneau -> `available` vaut 0 ou 1.
 * - Espace "open" (catégorie contenant "open") : plusieurs places possibles par créneau -> on calcule le nombre de places déjà réservées et on renvoie le nombre de places restantes (capacity - booked).
 */
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
      // Vérifie qu'aucune réservation existante ne chevauche la période demandée
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

    // Pour tous les autres cas, un créneau horaire est obligatoire
    if (!timeSlotId) {
      res.status(400).json({ message: "timeSlotId est requis" });
      return;
    }

    // --- Cas espace "exclusif" (salle de réunion, studio, etc.) ---
    // Un seul créneau possible : soit déjà pris, soit libre
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
    // On additionne les quantités déjà réservées (table cart) pour cet espace, cette date et ce créneau, puis on déduit le nombre de places restantes par rapport à la capacité totale de l'espace.
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
