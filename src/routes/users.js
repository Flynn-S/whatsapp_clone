import { Router } from "express";

import User from "../models/user.model";

const router = Router();

router.post("/register"), (req, res, next) => {};

router.post("/login"), (req, res, next) => {};

router.post("/update"), (req, res, next) => {};

router.get("/users"), (req, res, next) => {};

router.get("/users/:id"), (req, res, next) => {};

export default router;
