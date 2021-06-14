import jwt from 'jsonwebtoken';
import asyncHandler from '../utilities/asyncHandler.js';
import ErrorResponse from '../utilities/errorResponse.js';
import Profile from '../models/Profile.js';

// protect Routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await Profile.findById(decoded.id); // => the current logged in user
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});
