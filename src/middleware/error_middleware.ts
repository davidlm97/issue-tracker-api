// NOTE: Middleware in Express make use of the number of arguments to work
// That means that unused variables in the middleware functions declarations
// should be kept in order to make them work as expected.
import mongoose from "mongoose";
import { ErrorRequestHandler, RequestHandler, Request, Response, NextFunction } from "express";
/**
 * Middleware that manage asynchronous errors inside controllers. Use it by wrapping the controller functions (pass them as parameters)
 * @param {RequestHandler} callback Callback function to return
 * @return {RequestHandler} Return the param function
 */
 export const asyncMiddleware = (callback: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      return callback(req, res, next);
    } catch (err) {
      return next(err)
    }
  };
};

/**
 * Middleware for managing 405 error. Must be put at the end of a router if no HTTP method has been matched.
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Function to go to the next middleware
 * @return {RequestHandler} Return the response with the error in json
 */
export const methodNotAllowedErrorHandler: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  return res.status(405).json({ errors: [{ code: 405, msg: "Method not allowed for the resource specified" }] });
};

/**
// Middleware for managing 404 error. Use it at the end of the routes specified in the app main router.
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Function to go to the next middleware
 * @return {RequestHandler} Return the response with the error in json
 */
export const notFoundErrorHandler: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({ errors: [{ code: 404, msg: "Resource not found" }] });
};

/**
// Middleware where a request is sent if it has errored inside a controller.
 * @param {object} err Error in the request 
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Function to go to the next middleware
 * @return {ErrorRequestHandler} Return the response with the error in json
 */
export const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(new Date().toISOString() + err.stack);
  return res.status(500).json({ errors: [{ code: 500, msg: "Internal server error" }] });
};

/**
// Middleware to catch error when mongoId is incorrect.
 * @param {object} err Error in the request 
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Function to go to the next middleware
 * @return {ErrorRequestHandler} Return the response with the error in json
 */
export const mongoIdErrorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  if (err.kind === "ObjectId" && err instanceof mongoose.Error.CastError && err.path === "_id") {
    return res.status(404).json({ errors: [{ code: 404, msg: "incorrect id format" }] });
  }

  return next(err);
};
