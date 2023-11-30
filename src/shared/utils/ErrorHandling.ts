import { Response } from "express";
import { ZodError } from "zod";

export function ErrorHandling(error: unknown, response: Response) {
  if (error instanceof ZodError) {
    response.status(400).send({ error })
  }
  else if (error instanceof Error) {
    response.status(400).send({ error: error.message })
  } else {
    response.status(500).send({ error: "Unindentified Error" })
  }

}