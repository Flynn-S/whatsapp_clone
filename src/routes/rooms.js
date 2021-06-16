import { Router } from "express";

import Rooms from "../models/RoomsSchema";

const router = Router();

router.post("/rooms"), (req, res, next) => {};

router.get("/rooms/:id"),
  (req, res, next) => {
    // participants, details
  };

router.get("/rooms/:id/history"),
  (req, res, next) => {
    // chat history
  };

export default router;
