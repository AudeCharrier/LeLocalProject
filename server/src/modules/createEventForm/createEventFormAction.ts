import { log } from "node:console";
import type { RequestHandler } from "express";
import createEventRepository from "./createEventFormRepository";
type NewEvent = {
  name: string;
  description: string;
  start_date: string;
  username: string;
  people: number;
  end_date: string;
  space_id: number;
  time_slot_id: number;
};
const browse: RequestHandler = async (_req, res) => {
  res.json({
    message: "Create Event endpoint",
  });
};

const create: RequestHandler = async (req, res, next) => {
  try {
    console.log("BODY =", req.body);

    const event: NewEvent = {
      name: req.body.titre,
      description: req.body.description,
      start_date: req.body.startDate,
      end_date: req.body.endDate,
      space_id: req.body.salle,
      time_slot_id: req.body.creneau,
      username: req.body.nom,
      people: req.body.participants,
    };

    const insertId = await createEventRepository.create(event);

    res.status(201).json({ insertId });
  } catch (err) {
    console.error("ERREUR SQL =", err);
    next(err);
  }
};

export default {
  browse,
  create,
};
