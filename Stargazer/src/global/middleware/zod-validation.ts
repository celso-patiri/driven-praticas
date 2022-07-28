import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { UnprocessableEntityException } from "../exceptions/exceptions";

export default function validateSchema(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
    next();
  };
}
