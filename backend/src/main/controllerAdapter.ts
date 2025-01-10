import { Request, Response } from "express";
import { Controller } from "../controller/Controller";
import { HttpRequest } from "../protocols/http";

export const adaptController = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
    };

    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
