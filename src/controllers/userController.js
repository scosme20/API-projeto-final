import { User } from "../models/User.js";
import bcrypt from "bcrypt"

export default class userController {

    // "static" é usado para poder ter acesso ao método do classe sem precisar instanciar a classe.
    // se não tivesse o "static", seria necessário instanciar. exemplo: const instancia = new userController(), instancia.login
    // nesse caso posso chamar: userController.login, sem instanciar.
    static async login(req, res){
        const { email, password} = req.body

        if(!email || !password){
            res.status(422).json({ message: 'Todos os campos são obrigatórios!'})
            return 
        }

        const user = await User.findOne({where: {email:email}})


        // verifica se o email passado está cadastrado no banco de dados
        if(!user){
            res.status(422).json({ message: 'Não há usuário cadastrado com esse email!'})
            return 
        }

        // aqui é onde verifica se as senhas conhecidem, o bcrypt discriptografa a senha e compara as duas
        // se forem iguais, retorna true, senão retorna false/
        // primeiro argumento é a senha passada pelo usuário, o segundo é a senha criptografada registrada no banco de dados
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            res.status(422).json({ message: 'Senha incorreta!'})
            return 
        }

        res.status(200).json({ message: "Logado com sucesso!" })

    }

    static async register(req, res){
        const { name, email, password, confirmpassword } = req.body

        if(!name || !email || !password || !confirmpassword){
            res.status(422).json({ message: 'Todos os campos são obrigatórios!'})
            return 
        }

        if(password !== confirmpassword){
            res.status(422).json({ message: 'As senhão não conhecidem!'})
            return 
        }

        const checkIfUserExists = await User.findOne({where: {email:email}})
        
        // verifica se o email já está cadastrado
        if(checkIfUserExists){
            res.status(422).json({ message: 'O email já está sendo utilizado!'})
            return 
        }

        // gera 10 caracteres aleatórios para criptografar ainda mais a senha
        const salt = await bcrypt.genSalt(10);

        // criptografa a senha, recebe dois valores: A senha do usuário e "salt" (que são os 10 caracteres aleatórios)
        const hashPassword = await bcrypt.hash(password, salt);

        try {

            // um objeto literal do usuário, fica mais fácil criar assim para cirar o usuário
            const user = {
                name,
                email,
                password: hashPassword
            }

            const createdUser = await User.create(user)

            res.status(200).json({ user: createdUser })
  
        } catch (error) {
            res.status(500).json({message: error})
        }


        
    }

    static async getUserById(req, res){
        const id = req.params.id

        if(!id){
            res.status(422).json({ message: 'O id é obrigatório!'})
            return 
        }

        try {
            const user = await User.findByPk(id)
            if(!user){
                res.status(422).json({ message: 'Usuário não encontrado!'})
                return 
            }

            user.password = undefined
    
            res.status(200).json({ user })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async edit(req, res){

        const id = req.params.id

        const { name, email, password } = req.body

        let user = await User.findOne({where: {id:id}, raw: true})

        if(!name || !email || !password){
            res.status(422).json({ message: 'Todos os campos são obrigatórios!'})
            return 
        }

        if( name && name != user.name ){
            user.name = name
        }

        if(email && email != user.email ){
            user.email = email
        }

        const userExists = await User.findOne({ where: {email: email}})

        if(  userExists && user.email !== email){
            res.status(422).json({
                message: 'O email já foi cadastrado!'
            })
        }

        if(password){
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            user.password = hashPassword
        }
        
        try {
            await User.update(user, {where: {id:id}})
            res.status(201).json({ user })
        } catch (error) {
            console.log('Aconteceu um erro: ' + error)
        }

    

    }

    static async removeUser(req, res){
        const id = req.body.id

        if(!id){
            res.status(422).json({ message: 'O id é obrigatório!'})
            return 
        }

        try {

            await User.destroy({where: {id:id}})
            res.status(200).json({message: 'usuário deletado com sucesso!'})
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

}