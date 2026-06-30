import type { RequestHandler } from "express";
import createEventRepository from "./createEventFormRepository";

type NewEvent = {
  name: string;
  description: string;
  price_unit: number;
  start_date: string;
  end_date: string;
  space_id: number;
  time_slot_id: number;
  url_image: string | null;
};
const browse: RequestHandler = async (_req, res): Promise<void> => {
  res.json({
    message: "Create Event endpoint",
  });
};

const create: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const imageUrl: string | null = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const spaceId = Number(req.body.salle);
    const timeSlotId = Number(req.body.creneau);
    const startDate = req.body.startDate as string;

    const slotTaken = await createEventRepository.isEventSlotTaken(
      spaceId,
      startDate,
      timeSlotId,
    );

    if (slotTaken) {
      res.status(409).json({
        message: "Ce créneau est déjà pris pour cet espace.",
      });
      return;
    }

    const event: NewEvent = {
      name: req.body.titre as string,
      description: req.body.description as string,
      price_unit: Number(req.body.price),
      start_date: startDate,
      end_date: req.body.endDate as string,
      space_id: spaceId,
      time_slot_id: timeSlotId,
      url_image: imageUrl,
    };

    const insertId: number = await createEventRepository.create(event);
    res.status(201).json({ insertId });
  } catch (err) {
    console.error("ERREUR SQL =", err);
    next(err);
  }
};

export default { browse, create };
