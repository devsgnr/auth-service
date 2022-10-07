import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ILogin, IUser } from "../../../types/auth";
import { IAuthResponse } from "../../../types/response";
import env from "../../../utils/env";
import UserModel from "../../schema/auth";

type CustomRequest<T> = Request<{}, {}, T>;
type CustomResponse<T> = Response<IAuthResponse<T>>;

const CreateUser = async (
  req: CustomRequest<IUser>,
  res: CustomResponse<IUser>
) => {
  const { email, password } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, env.auth.passwordHash);

    const user = await UserModel.create({
      ...req.body,
      ...{ email: email.toLowerCase(), password: hashedPass },
    });
    const token = jwt.sign({ user: user._id, email }, env.auth.jwtToken, {
      expiresIn: "23h",
    });

    res.status(200).send({
      data: null,
      message: `Welcome, ${req.body.full_name}`,
      success: true,
      token: token,
    });
  } catch (error) {
    res.status(501).send({
      data: null,
      message: error as string,
      success: false,
      token: "",
    });
  }
};

const LoginUser = async (
  req: CustomRequest<ILogin>,
  res: CustomResponse<IUser>
) => {
  const { email } = req.body;
  let token;
  await UserModel.findOne({ email })
    .then(async (user: IUser | null) => {
      if (user) {
        token = jwt.sign({ user: user._id, email }, env.auth.jwtToken, {
          expiresIn: "23h",
        });
        res.status(200).send({
          data: user,
          message: `Welcome, ${user.full_name}`,
          success: true,
          token: token,
        });
      }
    })
    .catch((error: Error) => {
      res.status(501).send({
        data: null,
        message: error.message,
        success: false,
        token: "",
      });
    });
};

export { CreateUser, LoginUser };
