import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { ILogin, IUser } from "../../types/auth";
import { IResponse } from "../../types/response";
import UserModel from "../schema/auth";

type CustomRequest = Request<{}, {}, ILogin>;
type CustomResponse = Response<IResponse<ILogin>>;
type Next = NextFunction;

const LogIn = async (req: CustomRequest, res: CustomResponse, next: Next) => {
  const { email, password } = req.body;
  await UserModel.findOne({ email })
    .select("+password")
    .then(async (data: IUser | null) => {
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
