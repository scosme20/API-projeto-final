import { Review } from "../models/Review.js";

export default class ReviewController {

    static async addReview(req, res) {
        const { rating, comment, UserId, CompanyId } = req.body;

        if ( !rating || !comment) {
            res.status(422).json({ message: 'Todos os campos são obrigatórios!' });
            return;
        }

        try {
            const review = await Review.create({
                rating,
                comment,
                UserId,
                CompanyId
            });

            res.status(201).json({ review });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async getReviewsByUserId(req, res) {
        const userId = req.params.userId;

        if (!userId) {
            res.status(422).json({ message: 'O userId é obrigatório!' });
            return;
        }

        try {
            const reviews = await Review.findAll({ where: { userId } });

            res.status(200).json({ reviews });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async editReview(req, res) {
        const reviewId = req.params.reviewId;
        const { rating, comment } = req.body;

        if (!reviewId || !rating || !comment) {
            res.status(422).json({ message: 'Todos os campos são obrigatórios!' });
            return;
        }

        try {
            const existingReview = await Review.findByPk(reviewId);

            if (!existingReview) {
                res.status(422).json({ message: 'Avaliação não encontrada!' });
                return;
            }

            existingReview.rating = rating;
            existingReview.comment = comment;

            await existingReview.save();

            res.status(200).json({ review: existingReview });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async removeReview(req, res) {
        const reviewId = req.params.reviewId;

        if (!reviewId) {
            res.status(422).json({ message: 'O reviewId é obrigatório!' });
            return;
        }

        try {
            await Review.destroy({ where: { id: reviewId } });

            res.status(200).json({ message: 'Avaliação removida com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

}