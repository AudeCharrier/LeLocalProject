import type { RequestHandler } from "express";

// Import access to data
import eventRepository from "./eventRepository";

// The B of BREAD - Browse (Read All) operation
const browseUpcomingEvents: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const upcomingEvents = await eventRepository.readAllUpcomingEvents();

    // Respond with the items in JSON format
    res.json(upcomingEvents);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const itemId = Number(req.params.id);
    const item = await eventRepository.read(itemId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (item == null) {
      res.sendStatus(404);
    } else {
      res.json(item);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
/* const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const newItem = {
      title: req.body.title,
      user_id: req.body.user_id,
    };

    // Create the item
    const insertId = await spaceRepository.create(newItem);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
}; */

export default { browseUpcomingEvents, read };
