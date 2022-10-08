import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { WTLogin, WTUser } from "../../../types/auth";
import { WTAuthResponse } from "../../../types/response";
import env from "../../../utils/env";
import UserModel from "../../schema/auth";

type Incoming<T> = Request<{}, {}, T>;
type Outgoing<T> = Response<WTAuthResponse<T>>;

const CreateUser = async (req: Incoming<WTUser>, res: Outgoing<WTUser>) => {
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

const LoginUser = async (req: Incoming<WTLogin>, res: Outgoing<WTUser>) => {
  const { email } = req.body;
  let token;
  await UserModel.findOne({ email })
    .then(async (user: WTUser | null) => {
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
