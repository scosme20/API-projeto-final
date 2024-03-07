import Review from "../models/Review.js";
class ReviewController {

    static async createReview(req, res) {
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

        try {
            const createdReview = await Review.create(review);

            res.status(201).json({ createdReview });
        } catch (error) {
            res.status(500).json({ message: "Ocorreu um erro ao criar a avaliação, por favor, tente novamente mais tarde." });
        }
    }

    static async getReviewById(req, res) {
        const id = req.params.id;

        try {
            const review = await Review.findByPk(id);

            if(!review){
                res.status(404).json({ message: 'Essa avaliação não foi encontrada!' });
                return;
            }

            res.status(200).json({ review });

        } catch (error) {
            res.status(500).json({ message: 'Ocorreu um erro ao obter a avalição, por favor, tente novamente mais tarde.' });
        }
    }

    static async editReviewById(req, res) {
        const { id } = req.params;
        const { rating, comment } = req.body;

        const review = await Review.findByPk(id);

        if (!review) {
            res.status(404).json({ message: 'Não foi possível localizar esta avaliação!' });
            return;
        }

        if (!rating || !comment) {
            res.status(422).json({ message: 'Todos os campos são obrigatórios!' });
            return;
        }

        try {

            review.rating = rating;
            review.comment = comment;

            await review.save();

            res.status(200).json({ review });
        } catch (error) {
            res.status(500).json({ message: 'Ocorreu um erro ao editar a avaliação, por favor, tente novamente mais tarde.' });
        }
    }

    static async removeReviewById(req, res) {
        const { id } = req.params;

        try {
            await Review.destroy({ where: { id: id } });

            res.status(200).json({ message: 'A avaliação foi removida com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Ocorreu um erro ao remover a avaliação, por favor, tente novamente mais tarde.' });
        }
    }

}

export default ReviewController;