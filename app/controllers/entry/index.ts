import { Request, Response } from "express";
import env from "../../../utils/env";

const EntryController = (req: Request, res: Response) => {
  try {
    res.status(200).send({
      message: `Authentication Service running in ${env.node_env}`,
      timestamp: Date.now(),
      params: { ...req.params },
    });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export { EntryController };
