import { processPagination } from "../utils/index";
import { RequestHandler, Request, Response, NextFunction } from "express";

/**
// Middleware to process the pagination and save the var we need in the local storage.
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {next} next Function to go to the next middleware
 */
export const pagination: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const { page, offset, limit } = processPagination(parseInt(req.query.page as string), parseInt(req.query.count as string));

  res.locals.page = page;
  res.locals.offset = offset;
  res.locals.limit = limit;
  next();
};

export const validate = (schemaValidator) => {
  return function (req, res, next) {
    const { error, value } = schemaValidator.validate(req.body, { abortEarly: false });

    if (error) {
      const customErrors = error.details.map((err) => {
        return {
          message: err.message,
          param: err.context.label,
          value: err.context.value,
        };
      });
      return res.status(422).json({
        title: "wrong data in request body",
        errors: customErrors,
      });
    }

    req.body = value;
    next();
  };
};
