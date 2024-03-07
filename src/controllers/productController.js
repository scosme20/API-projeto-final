import Product  from "../models/Product.js";
import Company from "../models/Company.js";
import { Op } from "sequelize";
import Review from "../models/Review.js";
import { calculateRating } from "../helpers/helpers.js";

class ProductController {

    static async createProduct(req, res) {
        const { title, qty, price, description, CompanyId } = req.body;

        if ( !title || !qty || !price || !description || !CompanyId) {
            res.status(422).json({ message: 'Todos os campos são obrigatórios!' });
            return;
        }
        const product = {
            title,
            qty,
            price,
            description,
            CompanyId
        }

        try {
            const createdProduct = await Product.create(product)

            res.status(201).json({ createdProduct });
        } catch (error) {
            res.status(500).json({ message: "Ocorreu um erro ao cadastrar esse produto, por favor, tente novamente mais tarde." });
        }

    }

    static async getAllProducts(req,res) {

        let search = ''

        if(req.query.search){
            search = req.query.search
        }

        let order = 'DESC'

        if(req.query.value === 'lower'){
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        try {
            const products = await Product.findAll({
                include: {
                    model: Company,
                    attributes: {exclude: ['password', 'email']},
                    include: [Review, Product]
                },
                where: {
                    title: {[Op.like]: `%${search}%`}
                },
                order: [['price', order]]
            }); 

            products.forEach(product => {
                if(product.Company.Reviews.length){
                    product.Company.rating = calculateRating(product.Company.Reviews)
                }

                if(product.Company.Reviews.length){
                    product.Company.productQty = product.Company.Products.length
                }
            })

            

            res.status(200).json({products})
        } catch (error) {
            res.status(500).json({ message: "Ocorreu um erro ao obter os produtos, por favor, tente novamente mais tarde." })
        }
    }

    static async getProductById(req, res) {
        const { id } = req.params;

        try {
            
            const product = await Product.findByPk(id, {
                include: {
                    model: Company,
                    attributes: {
                        exclude: ['password', 'email']
                    },
                    include: [Review, Product]
                }
            })

            if(!product) {
                res.status(404).json({ message: 'Não foi possível localizar este produto!' });
                return;
            }

            if(product.Company.Reviews.length){
                product.Company.rating = calculateRating(product.Company.Reviews)
            }


            if(product.Company.Products.length){
                product.Company.productQty = product.Company.Products.length
            }

            res.status(200).json({ product });
        } catch (error) {
            res.status(500).json({ message: "Ocorreu um erro ao obter esse produto, por favor, tente novamente mais tarde." });
        }
    }

    static async editProductById(req, res) {
        const { id } = req.params;
        const { title, qty, price, description } = req.body;

        if (!title || !qty || !price || !description) {
            res.status(422).json({ message: "Todos os campos são obrigatórios!" });
            return;
        }

        try {
            const product = await Product.findByPk(id);

            if (!product) {
                res.status(422).json({ message: "Não foi possível localizar este produto!" });
                return;
            }
            
            product.title = title;
            product.qty = qty;
            product.price = price;
            product.description = description;

            await product.save();

            res.status(201).json({ product });
        } catch (error) {
            res.status(500).json({ message: "Ocorreu um erro ao editar o produto, por favor, tente novamente mais tarde." });
        }
    }

    static async removeProductById(req, res) {
        const { id } = req.params;

        try {
            await Product.destroy({ where: { id: id } });

            res.status(200).json({ message: "O produto foi removido com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Ocorreu um erro ao remover o produto, por favor, tente novamente mais tarde." });
        }
    }
}

export default ProductController;