import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { WTLogin, WTUser } from "../../types/auth";
import { WTResponse } from "../../types/response";
import UserModel from "../schema/auth";

type Incoming = Request<{}, {}, WTLogin>;
type Outgoing = Response<WTResponse<WTLogin>>;
type Next = NextFunction;

const LogIn = async (req: Incoming, res: Outgoing, next: Next) => {
  const { email, password } = req.body;
  await UserModel.findOne({ email })
    .select("+password")
    .then(async (data: WTUser | unknown | any) => {
      if (data && (await bcrypt.compare(password, data.password))) {
        next();
      } else {
        res.status(400).send({
          data: null,
          message: "Invalid Credentials",
          success: false,
        });
      }
    })
    .catch((error: Error) => {
      res.status(501).send({
        data: null,
        message: error.message,
        success: false,
      });
    });
};

export default LogIn;
