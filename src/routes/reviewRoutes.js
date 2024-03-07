import { Router } from "express";
import ReviewController from "../controllers/ReviewController.js";

const reviewRouter = Router();

reviewRouter.post('/', ReviewController.createReview);
reviewRouter.get('/:id', ReviewController.getReviewById);
reviewRouter.put('/:id', ReviewController.editReviewById);
reviewRouter.delete('/:id', ReviewController.removeReviewById);

export default reviewRouter;