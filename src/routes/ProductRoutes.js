import { Router } from "express";
import ProductController from "../controllers/productController.js";

const productRouter = Router();

productRouter.post('/add', ProductController.addProduct);
productRouter.get('/one/:id', ProductController.getProductById);
productRouter.put('/:id', ProductController.editProduct);
productRouter.delete('/:id', ProductController.removeProductById);
productRouter.get('/all', ProductController.getAllProducts);

export default productRouter;