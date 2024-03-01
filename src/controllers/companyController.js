import { Company } from '../models/Company.js'


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

        const checkPassword = await bcrypt.compare(password, companies.password)

        if(!checkPassword){
            res.status(422).json({ message: 'Senha incorreta!'})
            return 
        }

        res.status(200).json({ message: "Logado com sucesso!" })

    }

    static async register(req, res){
        const { name, email, password, category, confirmpassword } = req.body

        if(!name || !email || !password || !category || !confirmpassword){
            res.status(422).json({ message: 'Todos os campos são obrigatórios!'})
            return 
        }

        if(password !== confirmpassword){
            res.status(422).json({ message: 'As senhão não conhecidem!'})
            return 
        }

        const checkIfCompanyExists = await Companies.findOne({where: {email:email}})

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

            res.status(200).json({ user: createdCompany })
  
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
            const company = await Company.findByPk(id)
            if(!company){
                res.status(422).json({ message: 'empresa não encontrada!'})
                return 
            }

            company.password = undefined
    
            res.status(200).json({ company })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async edit(req, res){

        const id = req.params.id

        const { name, email, category, password } = req.body

        if(!name || !email ||  !category || !password ) {
            res.status(422).json({ message: 'Todos os campos são obrigatórios!'})
            return 
        }

        let company = await Company.findOne({where: {id:id}, raw: true})

        if( name && name != company.name ){
            company.name = name
        }

        if(email && email != company.email ){
            company.email = email
        }

        const CheckIfCompanyExists = await Company.findOne({ where: {email: email}})

        if( CheckIfCompanyExists && company.email !== email){
            res.status(422).json({
                message: 'O email já foi cadastrado!'
            })
        }

        if(password){
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            company.password = hashPassword
        }
        
        try {
            await Company.update(company, {where: {id:id}})
            res.status(201).json({ company })
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

            res.status(200).json({message: 'empresa deletado com sucesso!'})

        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
    
}
