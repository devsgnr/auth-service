import { NextFunction, Request, Response } from "express";
import { IUser } from "../../types/auth";
import { IResponse } from "../../types/response";

type CustomRequest = Request<{}, {}, IUser>;
type CustomResponse = Response<IResponse<null>>;
type Next = NextFunction;

const CheckRegister = (req: CustomRequest, res: CustomResponse, next: Next) => {
  const { email, password, full_name } = req.body;
  if (!(email && password && full_name)) {
    res
      .status(400)
      .send({ data: null, message: "All fields are required", success: false });
  } else {
    next();
  }
};

export default CheckRegister;
