import { Router } from 'express';

import UserModel from '../models/user.js';
import RoomModel from '../models/rooms.js';

const router = Router();

router.get('/me', async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const query = req.query.email;

    const findUser = await UserModel.find({
      email: { $regex: new RegExp(query, 'i') },
    }).sort({ email: 1 });
    res.send(findUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// router.get("/:id", async (req, res, next) => {});

router.get('/rooms', async (req, res, next) => {
  try {
    const id = req.user._id;

    // if (id === ) return

    const rooms = await RoomModel.find({ usersId: id }).populate('usersId');

    res.send(rooms);
  } catch (error) {
    next(error);
  }
});

export default router;
