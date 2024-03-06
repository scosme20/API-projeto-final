import { Router } from "express";
import ReviewController from "../controllers/ReviewController.js";

const reviewRouter = Router();

reviewRouter.post('/create/new', ReviewController.createReview);
reviewRouter.get('/:id', ReviewController.getReviewById);
reviewRouter.put('/:id', ReviewController.editReviewById);
reviewRouter.delete('/:id', ReviewController.removeReviewById);

export default reviewRouter;