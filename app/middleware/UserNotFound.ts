import { NextFunction, Request, Response } from "express";
import { IUser } from "../../types/auth";
import { IResponse } from "../../types/response";
import UserModel from "../schema/auth";

type CustomRequest = Request<{}, {}, IUser>;
type CustomResponse = Response<IResponse<null>>;
type Next = NextFunction;

const checkUserNotExisting = async (
  req: CustomRequest,
  res: CustomResponse,
  next: Next
) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    res
      .status(404)
      .send({ data: null, message: "User not found", success: false });
  } else {
    next();
  }
};

export default checkUserNotExisting;
