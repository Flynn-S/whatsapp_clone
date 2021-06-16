import { Router } from 'express';

import User from '../models/user.js';

const router = Router();

router.post('/update'), (req, res, next) => {};

router.get('/'), (req, res, next) => {};

router.get('/:id'), (req, res, next) => {};

router.get('/:id/rooms'),
  (req, res, next) => {
    const id = req.params.id;

    // if (id === ) return

    const rooms = RoomModel.find({ userId: id });
  };

export default router;
