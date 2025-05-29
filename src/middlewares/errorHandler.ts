import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Error:", err);

  const statusCode = err.status || 500;

  res
    .status(statusCode)
    .json({ error: { message: err.message || "Internal Server Error" } });
};
