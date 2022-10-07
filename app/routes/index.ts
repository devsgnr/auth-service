import express, { Router } from "express";
import AuthRouter from "./auth";
import EntryRouter from "./entry";

/* Setup Router */
const Routers: Router = express.Router();

/* Entry Router */
Routers.use("/", EntryRouter);

/* Auth Router */
Routers.use("/auth", AuthRouter);

export default Routers;
