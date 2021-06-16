import { verifyJWT } from "./tools.js";
import UserModel from "../models/user.js";

export const jwtAuth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    const decoded = await verifyJWT(token);
    const user = await UserModel.findOne({
      _id: decoded._id,
    });
    if (!user) {
      throw new Error("Credentials are incorect");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    const error = new Error("Admin Only");
    error.httpStatusCode = 403;
    next(error);
  }
};
