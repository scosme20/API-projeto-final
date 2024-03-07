import Company from '../models/Company.js'
import bcrypt from "bcrypt"
import Review from '../models/Review.js'
import Product from '../models/Product.js'
import { calculateRating, hideCompanyPassword } from '../helpers/helpers.js'
import { Op } from 'sequelize'

class CompanyController {

    static async signIn(req, res){
        const { email, password} = req.body

        if(!email || !password){
            res.status(422).json({ message: "Todos os campos são obrigatórios!"})
            return 
        }

        const company = await Company.findOne({where: {email:email}})

        if(!company){
            res.status(422).json({ message: "Nenhuma empresa foi localizada com esse email!"})
            return 
        }

        const checkPassword = await bcrypt.compare(password, company.password)

        if(!checkPassword){
            res.status(422).json({ message: "Senha incorreta!"})
            return 
        }

        res.status(200).json({ message: "Logado com sucesso!" })

    }

    static async signUp(req, res){
        const { name, email, category, password, confirmpassword } = req.body

        if(!name || !email || !category || !password || !confirmpassword){
            res.status(422).json({ message: 'Todos os campos são obrigatórios!'})
            return 
        }

        if(password !== confirmpassword){
            res.status(422).json({ message: 'As senhão não conhecidem!'})
            return 
        }

        const checkIfCompanyExists = await Company.findOne({where: {email:email}})

        if(checkIfCompanyExists){
            res.status(422).json({ message: 'Esse email já está sendo utilizado!'})
            return 
        }

        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);

        try {

            const company = {
                name,
                email,
                category,
                password: hashPassword
            }

            const createdCompany = await Company.create(company)

            res.status(201).json(hideCompanyPassword(createdCompany))
  
        } catch (error) {
            res.status(500).json({message: "Ocorreu um erro ao cadastrar esta empresa, por favor, tente novamente mais tarde."})
        }


        
    }

    static async getAllCompanies(req, res){

        let search = ''

        if(req.query.search){
            search = req.query.search
        }

        try {
            const companies = await Company.findAll({
                attributes: {exclude: ['password', 'email']},
                include: [Review, Product],
                where: {
                    name: {[Op.like]: `%${search}%`}
                }
            })

            companies.forEach(company => {
                if(company.Reviews.length){
                    company.rating = calculateRating(company.Reviews)
                }

                if(company.Products.length){
                    company.productQty = company.Products.length
                }
            })


            res.status(200).json({companies})
        } catch (error) {
            res.status(500).json({ message: "Ocorreu um erro ao obter todas as empresas, por favor, tente novamente mais tarde." })
        }
    }

    static async getCompanyById(req, res){
        const { id } = req.params

        try {
            const company = await Company.findByPk(id, {
                attributes: { exclude: ['password']},
                include: [Review, Product]
            });
            
            if(!company){
                res.status(404).json({ message: 'Não foi possivel localizar esta empresa!'})
                return 
            }

            if(company.Reviews.length){
                company.rating = calculateRating(company.Reviews)
            }

            if(company.Products.length){
                company.productQty = company.Products.length
            }
    
            res.status(200).json({ company })
        } catch (error) {
            res.status(500).json({ message: "Ocorreu um erro ao obter esta empresa, por favor, tente novamente mais tarde." })
        }
    }

    static async editCompnayById(req, res){

        const { id } = req.params;

        const { name, email, category, password, confirmpassword} = req.body

        let company = await Company.findByPk(id)

        if(!company){
            res.status(422).json({ message: "Não foi possível localizar essa empresa! "})
        }

        if(!name || !email ||  !category ) {
            res.status(422).json({ message: 'Todos os campos são obrigatórios!'})
            return 
        }



        const CheckIfCompanyExists = await Company.findOne({ where: {email: email}})

        if( CheckIfCompanyExists && company.email !== email){
            res.status(422).json({
                message: 'O email já foi cadastrado!'
            })
        }

        company.name = name
        company.email = email
        company.category = category

        if(password != confirmpassword){
            res.status(422).json({ message: 'As senhas não conferem!'})
            return 
        } else if(password === confirmpassword && password != null) {
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            company.password = passwordHash
        }
        
        try {
            await Company.update(company, {where: {id:id}})
            res.status(201).json({ company: company })
        } catch (error) {
            res.status(500).json({ message: "Ocorreu um erro ao editar a empresa, por favor, tente novamente mais tarde."})
        }

    

    }

    static async removeCompanyById(req, res){
        const { id } = req.params;

        try {

            await Company.destroy({where: {id:id}})

            res.status(200).json({message: 'empresa removida com sucesso!'})

        } catch (error) {
            res.status(500).json({ message: "Ocorreu um erro ao remover essa empresa, por favor, tente novamente mais tarde." })
        }
    } 
}

export default CompanyController;
