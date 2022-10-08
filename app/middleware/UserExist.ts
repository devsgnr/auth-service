import { NextFunction, Request, Response } from "express";
import { WTUser } from "../../types/auth";
import { WTResponse } from "../../types/response";
import UserModel from "../schema/auth";

type Incoming = Request<{}, {}, WTUser>;
type Outgoing = Response<WTResponse<null>>;
type Next = NextFunction;

const UserExist = async (req: Incoming, res: Outgoing, next: Next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    res.status(409).send({
      data: null,
      message: "User Exists",
      success: false,
    });
  } else {
    next();
  }
};

export default UserExist;
