import express, { Router } from "express";
import { EntryController } from "../../controllers/entry";

/* Setup Router */
const EntryRouter: Router = express.Router();

/* Entry Routers */
/* Route to signal server running */
EntryRouter.get("/:id", EntryController);

export default EntryRouter;
