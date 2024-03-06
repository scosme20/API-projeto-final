import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const productRouter = Router();

productRouter.post('/create/new', ProductController.createProduct);
productRouter.get('/one/:id', ProductController.getProductById);
productRouter.put('/:id', ProductController.editProductById);
productRouter.delete('/:id', ProductController.removeProductById);
productRouter.get('/all', ProductController.getAllProducts);

export default productRouter;