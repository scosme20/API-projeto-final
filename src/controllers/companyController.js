import Company from '../models/Company.js'
import bcrypt from "bcrypt"
import { Review } from '../models/Review.js'


export default class companyController {

    static async login(req, res){
        const { email, password} = req.body

        if(!email || !password){
            res.status(422).json({ message: 'Todos os campos são obrigatórios!'})
            return 
        }

        const company = await Company.findOne({where: {email:email}})

        if(!company){
            res.status(422).json({ message: 'Não há empresa cadastrada com esse email!'})
            return 
        }

        const checkPassword = await bcrypt.compare(password, company.password)

        if(!checkPassword){
            res.status(422).json({ message: 'Senha incorreta!'})
            return 
        }

        res.status(200).json({ message: "Logado com sucesso!" })

    }

    static async register(req, res){
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
            res.status(422).json({ message: 'O email já está sendo utilizado!'})
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

            res.status(200).json({ company: createdCompany })
  
        } catch (error) {
            res.status(500).json({message: error})
        }


        
    }

    static async getCompanyById(req, res){
        const id = req.params.id

        if(!id){
            res.status(422).json({ message: 'O id é obrigatório!'})
            return 
        }

        try {
            const company = await Company.findByPk(id);
            if(!company){
                res.status(422).json({ message: 'empresa não encontrada!'})
                return 
            }

            company.password = undefined

            const reviews = await company.getReviews();

            company.rating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    
            res.status(200).json({ company, reviews })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async edit(req, res){

        const id = req.params.id

        const { name, email, category, password, confirmpassword } = req.body

        if(!name || !email ||  !category ) {
            res.status(422).json({ message: 'Todos os campos são obrigatórios!'})
            return 
        }

        let company = await Company.findOne({where: {id:id}, raw: true})

        if(!company){
            res.status(422).json({ message: "empresa não encontrada! "})
        }

        console.log(company)

        if(name != company.name ){
            company.name = name
        }

        if(email != company.email ){
            company.email = email
        }

        if(category != company.category ){
            company.category = category
        }

        const CheckIfCompanyExists = await Company.findOne({ where: {email: email}})

        if( CheckIfCompanyExists && company.email !== email){
            res.status(422).json({
                message: 'O email já foi cadastrado!'
            })
        }

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
            console.log('Aconteceu um erro: ' + error)
        }

    

    }

    static async removeById(req, res){
        const id = req.params.id

        if(!id){
            res.status(422).json({ message: 'O id é obrigatório!'})
            return 
        }

        try {

            await Company.destroy({where: {id:id}})

            res.status(200).json({message: 'empresa deletada com sucesso!'})

        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
    
}
