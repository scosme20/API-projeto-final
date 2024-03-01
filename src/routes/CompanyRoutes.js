import { Router } from "express";
import companyController from '../controllers/companyController.js';

const companyRouter = Router()

companyRouter.post('/register', companyController.register)
companyRouter.post('/login', companyController.login)
companyRouter.get('/:id', companyController.getCompanyById)
companyRouter.put('/:id', companyController.edit)
companyRouter.delete('/:id', companyController.removeById)

export { companyRouter }