import { Router } from "express";
import CompanyController from '../controllers/CompanyController.js';

const companyRouter = Router()

companyRouter.post('/auth/signup', CompanyController.signUp)
companyRouter.post('/auth/signin', CompanyController.signIn)
companyRouter.get('/', CompanyController.getAllCompanies)
companyRouter.get('/:id', CompanyController.getCompanyById)
companyRouter.put('/:id', CompanyController.editCompnayById)
companyRouter.delete('/:id', CompanyController.removeCompanyById)

export default companyRouter 