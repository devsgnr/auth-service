import { NextFunction, Request, Response } from "express";
import { WTUser } from "../../types/auth";
import { WTResponse } from "../../types/response";

type Incoming = Request<{}, {}, WTUser>;
type Outgoing = Response<WTResponse<null>>;
type Next = NextFunction;

const CheckRegister = (req: Incoming, res: Outgoing, next: Next) => {
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
