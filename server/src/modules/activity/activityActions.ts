import type { RequestHandler } from "express";

import workshopRepository from "./activityRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const workshops = await workshopRepository.readAll();
    res.json(workshops);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const itemId = Number(req.params.id);
    const item = await workshopRepository.read(itemId);
    if (item == null) {
      res.sendStatus(404);
    } else {
      res.json(item);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read };
