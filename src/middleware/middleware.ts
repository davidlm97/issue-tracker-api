import { processPagination } from "../utils/index";

// TODO tipado, docs y comentarios

export const pagination = (req, res, next) => {
  const { page, page_size, offset, limit } = processPagination(req.query.page, req.query.count);

  res.locals.page = page;
  res.locals.page_size = page_size;
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
