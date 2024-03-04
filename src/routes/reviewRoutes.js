import { Router } from "express";
import reviewController from "../controllers/reviewController.js";

const reviewRouter = Router();

reviewRouter.post('/add', reviewController.addReview);
reviewRouter.get('/user/:userId', reviewController.getReviewsByUserId);
reviewRouter.put('/edit/:reviewId', reviewController.editReview);
reviewRouter.delete('/remove/:reviewId', reviewController.removeReview);

export { reviewRouter };