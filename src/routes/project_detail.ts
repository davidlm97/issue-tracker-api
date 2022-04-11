import express from "express";
import { pagination, validate } from "../middleware/middleware";
import { asyncMiddleware } from "../middleware/error_middleware";
import ProjectModel from "../models/project_model";
import Joi from "joi";

const router = express.Router({ mergeParams: true });

// GET PROJECTS BY ID
router.get(
  "/",
  // Perm validation (in token)
  asyncMiddleware(async (req, res, next) => {
    const project = await ProjectModel.findOne({ _id: req.params.id_project });

    if (!project) {
      return res.status(404).json({ errors: [{ msg: "project not found" }] });
    }

    return res.status(200).json(project);
  })
);

export default router;
