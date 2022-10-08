import { NextFunction, Request, Response } from "express";
import { WTLogin } from "../../types/auth";
import { WTResponse } from "../../types/response";

type Incoming = Request<{}, {}, WTLogin>;
type Outgoing = Response<WTResponse<null>>;
type Next = NextFunction;

const CheckLogin = (req: Incoming, res: Outgoing, next: Next) => {
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
