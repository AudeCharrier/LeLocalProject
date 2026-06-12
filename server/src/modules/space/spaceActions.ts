import type { RequestHandler } from "express";

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

export default { browse, read };
