import type { RequestHandler } from "express";
import activityRepository from "./activityRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const activities = await activityRepository.readAll();
    res.json(activities);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const activityId = Number(req.params.id);
    const activity = await activityRepository.read(activityId);
    if (activity == null) {
      res.sendStatus(404);
    } else {
      res.json(activity);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read };
