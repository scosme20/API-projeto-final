import { Router } from "express";
import reviewController from "../controllers/reviewController.js";

const reviewRouter = Router();

reviewRouter.post('/add', reviewController.addReview);
reviewRouter.get('/:id', reviewController.getReviewById);
reviewRouter.put('/:id', reviewController.editReview);
reviewRouter.delete('/:id', reviewController.removeReviewById);

export default reviewRouter;