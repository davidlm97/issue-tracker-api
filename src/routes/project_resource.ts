import express from "express";
import { pagination, validate } from "../middleware/middleware";
import { asyncMiddleware } from "../middleware/error_middleware";
import ProjectModel from "../models/project_model";
import Joi from "joi";
import { computePaginationRes } from "../utils";

const router = express.Router();

// GET PROJECTS
router.get(
  "/",
  // Perm validation (in token)
  pagination,
  asyncMiddleware(async (req, res, next) => {
    const result = await ProjectModel.aggregate([
      // TODO wrapper functions
      { $match: {} },
      // { $sort: {} },
      {
        $facet: {
          totalItems: [{ $count: "count" }],
          data: [
            { $skip: res.locals.offset },
            { $limit: res.locals.limit },
            {
              $lookup: { from: "issues", localField: "_id", foreignField: "projectId", as: "issues" },
            },
          ],
        },
      },
    ]);
    return res.status(200).json(computePaginationRes(res.locals.page, res.locals.page_size, result[0].totalItems[0]?.count, result[0].data));
  })
);

const projectPostValidator = Joi.object({
  name: Joi.string().required().max(50),
  description: Joi.string().max(300),
});

// POST PROJECT
router.post(
  "/",
  // Perm validation (in token)
  validate(projectPostValidator),
  asyncMiddleware(async (req, res, next) => {
    const project = new ProjectModel(req.body);

    await project.save();

    return res.status(200).json(project);
  })
);

export default router;
