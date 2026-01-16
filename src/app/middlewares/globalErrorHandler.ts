import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Prisma } from "../generated/prisma/client";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number =err.statusCode ||  httpStatus.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = err.message || "Something went wrong!";
  let error = err;

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      (message = "Duplicate Key Error !!"),
        (error = err.meta),
        (statusCode = httpStatus.CONFLICT);
    }
    if (err.code === "P1000") {
      (message = "Authentication failed against server!!"),
        (error = err.meta),
        (statusCode = httpStatus.BAD_GATEWAY);
    }
    if (err.code === "P2003") {
      (message = "Foreign key constrait failed!!"),
        (error = err.meta),
        (statusCode = httpStatus.BAD_REQUEST);
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    (message = "Validation Error"),
      (error = err.message),
      (statusCode = httpStatus.BAD_REQUEST);
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    (message = "Unkonwn Prisma Error"),
      (error = err.message),
      (statusCode = httpStatus.BAD_REQUEST);
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    (message = "Prisma cline failed to intialized Error"),
      (error = err.message),
      (statusCode = httpStatus.BAD_REQUEST);
  }
  res.status(statusCode).json({
    success,
    message,
    error,
  });
};

export default globalErrorHandler;
