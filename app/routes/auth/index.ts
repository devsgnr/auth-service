import express, { Router } from "express";
import { CreateUser, LoginUser } from "../../controllers/auth";
import CheckLogin from "../../middleware/CheckLogin";
import CheckRegister from "../../middleware/CheckRegister";
import UserExist from "../../middleware/UserExist";
import UserNotFound from "../../middleware/UserNotFound";
import LogIn from "../../middleware/LogIn";

/* Setup Auth Router */
const AuthRouter: Router = express.Router();

/* Register */
AuthRouter.post("/register", CheckRegister, UserExist, CreateUser);

/* Login */
AuthRouter.post("/login", CheckLogin, UserNotFound, LogIn, LoginUser);

export default AuthRouter;
