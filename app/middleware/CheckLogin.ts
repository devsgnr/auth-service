import { NextFunction, Request, Response } from "express";
import { ILogin } from "../../types/auth";
import { IResponse } from "../../types/response";

type CustomRequest = Request<{}, {}, ILogin>;
type CustomResponse = Response<IResponse<null>>;
type Next = NextFunction;

const CheckLogin = (req: CustomRequest, res: CustomResponse, next: Next) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    res
      .status(400)
      .send({ data: null, message: "All fields are required", success: false });
  } else {
    next();
  }
};

export default CheckLogin;
