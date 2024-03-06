import Review from "../models/Review.js";

export default class ReviewController {

    static async addReview(req, res) {
        const { rating, comment, UserId, CompanyId } = req.body;

        if ( !rating || !comment || !UserId || !CompanyId) {
            res.status(422).json({ message: 'Todos os campos são obrigatórios!' });
            return;
        }

        const review = {
            rating,
            comment,
            UserId,
            CompanyId
        }

        console.log(review)

        try {
            const createdReview = await Review.create(review);

            console.log(createdReview)

            res.status(201).json({ createdReview });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async getReviewById(req, res) {
        const id = req.params.id;

        console.log(id)

        if (!id) {
            res.status(422).json({ message: 'O id é obrigatório!' });
            return;
        }

        try {
            const review = await Review.findByPk(id);

            res.status(200).json({ review });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async editReview(req, res) {
        const id = req.params.id;
        const { rating, comment } = req.body;

        if (!id || !rating || !comment) {
            res.status(422).json({ message: 'Todos os campos são obrigatórios!' });
            return;
        }

        try {
            const review = await Review.findByPk(id);

            if (!review) {
                res.status(422).json({ message: 'Avaliação não encontrada!' });
                return;
            }

            review.rating = rating;
            review.comment = comment;

            await review.save();

            res.status(200).json({ review });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async removeReviewById(req, res) {
        const id = req.params.id;

        if (!id) {
            res.status(422).json({ message: 'O reviewId é obrigatório!' });
            return;
        }

        try {
            await Review.destroy({ where: { id: id } });

            res.status(200).json({ message: 'Avaliação removida com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

}