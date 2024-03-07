import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const productRouter = Router();

productRouter.post('/', ProductController.createProduct);
productRouter.get('/', ProductController.getAllProducts);
productRouter.get('/:id', ProductController.getProductById);
productRouter.put('/:id', ProductController.editProductById);
productRouter.delete('/:id', ProductController.removeProductById);


export default productRouter;