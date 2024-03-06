import Product  from "../models/Product.js";

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

        console.log(product)

        try {
            const createdProduct = await Product.create(product)

            console.log(createdProduct)

            res.status(201).json({ createdProduct });
        } catch (error) {
            res.status(500).json({ message: error });
        }

    }

    static async getAllProducts(req,res) {
        try {
            const products = await Product.findAll(); 
            res.status(200).json({
                products
            })
        } catch (error) {
            
        }
    }

    static async getProductById(req, res) {
        const id = req.params.id;

        console.log(id)

        if (!id) {
            res.status(422).json({ message: 'O id é obrigatório!' });
            return;
        }

        const product = await Product.findByPk(id);

        if(!product) {
            res.status(422).json({ message: 'Esse produto não existe!' });
            return;
        }

        try {
            

            res.status(200).json({ product });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async editProductById(req, res) {
        const id = req.params.id;
        const { title, qty, price, description } = req.body;

        if (!id || !title || !qty || !price || !description) {
            res.status(422).json({ message: 'Todos os campos são obrigatórios!' });
            return;
        }

        try {
            const product = await Product.findByPk(id);

            if (!product) {
                res.status(422).json({ message: 'Produto não encontrado!' });
                return;
            }
            
            product.title = title;
            product.qty = qty;
            product.price = price;
            product.description = description;

            await product.save();

            res.status(200).json({ product });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async removeProductById(req, res) {
        const id = req.params.id;

        if (!id) {
            res.status(422).json({ message: 'O Id é obrigatório!' });
            return;
        }

        try {
            await Product.destroy({ where: { id: id } });

            res.status(200).json({ message: 'Produto removido com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}

export default ProductController;