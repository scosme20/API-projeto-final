import { companies} from '../models/companies.js'


export default class companiesController {

    static async loginCompanies(req, res){
        const { email, password} = req.body

        if(!email || !password){
            res.status(422).json({ message: 'Todos os campos são obrigatórios!'})
            return 
        }

        const companies = await Companies.findOne({where: {email:email}})

        if(!companies){
            res.status(422).json({ message: 'Não há usuário cadastrado com esse email!'})
            return 
        }

        const checkPassword = await bcrypt.compare(password, companies.password)

        if(!checkPassword){
            res.status(422).json({ message: 'Senha incorreta!'})
            return 
        }

        res.status(200).json({ message: "Logado com sucesso!" })

    }

    static async registerCompanie(req, res){
        const { name, email, password, category, confirmpassword } = req.body

        if(!name || !email || !password || !category || !confirmpassword){
            res.status(422).json({ message: 'Todos os campos são obrigatórios!'})
            return 
        }

        if(password !== confirmpassword){
            res.status(422).json({ message: 'As senhão não conhecidem!'})
            return 
        }

        const checkIfCompaniesExists = await Companies.findOne({where: {email:email}})

        if(checkIfCompaniesExists){
            res.status(422).json({ message: 'O email já está sendo utilizado!'})
            return 
        }

        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);

        try {

            const companies = {
                name,
                email,
                category,
                password: hashPassword
            }

            const createdCompanies = await Companies.create(companies)

            res.status(200).json({ user: createdCompanies })
  
        } catch (error) {
            res.status(500).json({message: error})
        }


        
    }

    static async getCompaniesById(req, res){
        const id = req.params.id

        if(!id){
            res.status(422).json({ message: 'O id é obrigatório!'})
            return 
        }

        try {
            const companies = await Companies.findByPk(id)
            if(!companies){
                res.status(422).json({ message: 'empresa não encontrada!'})
                return 
            }

            companies.password = undefined
    
            res.status(200).json({ companies })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async editCompanies(req, res){

        const id = req.params.id

        const { name, email, category, password } = req.body

        let companies = await Companies.findOne({where: {id:id}, raw: true})

        if(!name || !email ||  !category || !password ) {
            res.status(422).json({ message: 'Todos os campos são obrigatórios!'})
            return 
        }

        if( name && name != companies.name ){
            companies.name = name
        }

        if(email && email != companies.email ){
            companies.email = email
        }

        const CompaniesExists = await Companies.findOne({ where: {email: email}})

        if(  CompaniesExists && Companies.email !== email){
            res.status(422).json({
                message: 'O email já foi cadastrado!'
            })
        }

        if(password){
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            companies.password = hashPassword
        }
        
        try {
            await Companies.update(companies, {where: {id:id}})
            res.status(201).json({ companies })
        } catch (error) {
            console.log('Aconteceu um erro: ' + error)
        }

    

    }

    static async removeCompanies(req, res){
        const id = req.body.id

        if(!id){
            res.status(422).json({ message: 'O id é obrigatório!'})
            return 
        }

        try {

            await Companies.destroy({where: {id:id}})
            res.status(200).json({message: 'empresa deletado com sucesso!'})
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
    
}
