import { Router } from "express";
import { companiesController } from '../controllers/companiesController';

const companiesRouter = routeer()

companiesRouter.post('/registerCompanies')
companiesRouter.post('/loginCompanies')
companiesRouter.get('/:id')
companiesRouter.put('/editCompanies/:id')
companiesRouter.delete('/removeCompanies')

export { companiesRouter }