import express from "express";
import { asyncMiddleware } from "../middleware/error_middleware";

const router = express.Router();

/* GET home page. */
router.get('/', asyncMiddleware(async (req, res, next) => {
    return res.status(200).json({ message: "Hello world!" });
}));

export default router;