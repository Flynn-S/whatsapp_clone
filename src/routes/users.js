import { Router } from "express";

import User from "../models/user.model";

const router = Router();

router.post("/update"), (req, res, next) => {};

router.get("/users"), (req, res, next) => {};

router.get("/users/:id"), (req, res, next) => {};

router.get("/users/:id/rooms"),
  (req, res, next) => {
    const id = req.params.id;

    // if (id === ) return

    const rooms = RoomModel.find({ userId: id });
  };

export default router;
