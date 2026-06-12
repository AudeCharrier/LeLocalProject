import type { RequestHandler } from "express";
import createEventRepository from "./createEventFormRepository";

type NewEvent = {
  name: string;
  description: string;
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

    const event: NewEvent = {
      name: req.body.titre as string,
      description: req.body.description as string,
      start_date: req.body.startDate as string,
      end_date: req.body.endDate as string,
      space_id: Number(req.body.salle),
      time_slot_id: Number(req.body.creneau),
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
