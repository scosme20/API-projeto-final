import User from "../models/User.js";
import bcrypt from "bcrypt"
import Review from "../models/Review.js";
import { hideUserPassword } from "../helpers/helpers.js";

class UserController {

    // "static" é usado para poder ter acesso ao método do classe sem precisar instanciar a classe.
    // se não tivesse o "static", seria necessário instanciar. exemplo: const instancia = new userController(), instancia.login
    // nesse caso posso chamar: userController.login, sem instanciar.
    static async signIn(req, res){
        const { email, password } = req.body

        if(!email || !password){
            res.status(422).json({ message: 'Todos os campos são obrigatórios!'})
            return 
        }

        const user = await User.findOne({where: {email:email}})


        // verifica se o email passado está cadastrado no banco de dados
        if(!user){
            res.status(422).json({ message: "Nenhum usuário foi localizado com esse email!"})
            return 
        }

        // aqui é onde verifica se as senhas conhecidem, o bcrypt discriptografa a senha e compara as duas
        // se forem iguais, retorna true, senão retorna false/
        // primeiro argumento é a senha passada pelo usuário, o segundo é a senha criptografada registrada no banco de dados
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            res.status(422).json({ message: "Senha incorreta!"})
            return 
        }

        res.status(200).json({ message: "Logado com sucesso!" })

    }

    static async signUp(req, res){
        const { name, email, password, confirmpassword } = req.body

        if(!name || !email || !password || !confirmpassword){
            res.status(422).json({ message: "Todos os campos são obrigatórios!"})
            return 
        }

        if(password !== confirmpassword){
            res.status(422).json({ message: "As senhão não conhecidem!"})
            return 
        }

        const checkIfUserExists = await User.findOne({where: {email:email}})
        
        // verifica se o email já está cadastrado
        if(checkIfUserExists){
            res.status(422).json({ message: "Esse email já está sendo utilizado!"})
            return 
        }

        // gera 10 caracteres aleatórios para criptografar ainda mais a senha
        const salt = await bcrypt.genSalt(10);

        // criptografa a senha, recebe dois valores: A senha do usuário e "salt" (que são os 10 caracteres aleatórios)
        const hashPassword = await bcrypt.hash(password, salt);

                    // um objeto literal do usuário, fica mais fácil criar assim para cirar o usuário
        const user = {
            name,
            email,
            password: hashPassword
        }

        try {
            const createdUser = await User.create(user)
            res.status(201).json(hideUserPassword(createdUser))
        } catch (error) {
            res.status(500).json({message: "Ocorreu um erro ao cadastrar o usuário, por favor, tente novamente mais tarde."})
        }


        
    }

    static async getUserById(req, res){
        const { id } = req.params

        try {
            const user = await User.findByPk(id, 
                {
                    attributes: {exclude: ["password"]},
                    include: Review
                })

            if(!user){
                res.status(404).json({ message: "Não foi possível localizar esse usuário!"})
                return 
            }
    
            res.status(200).json({ user })

        } catch (error) {
            res.status(500).json({ message: "Ocorreu um erro ao obter o usuário, por favor, tente novamente mais tarde." })
        }
    }

    static async editUserById(req, res){

        const { id } = req.params;
        const { name, email, password, confirmpassword} = req.body

        let user = await User.findByPk(id)

        if(!user){
            res.status(422).json({ message: "Não foi possível localizar esse usuário!"})
        }

        if(!name || !email){
            res.status(422).json({ message: "Todos os campos são obrigatórios!"})
            return 
        }



        const userExists = await User.findOne({ where: {email: email}})

        if(  userExists && user.email !== email){
            res.status(422).json({
                message: "O email já foi cadastrado!"
            })
        }

        user.name = name
        user.email = email

        if(password != confirmpassword){
            res.status(422).json({ message: "As senhas não conferem!"})
            return 
        } else if(password === confirmpassword && password != null) {
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }
        
        try {
            await User.update(user, {where: {id:id}})
            res.status(201).json({ user })

        } catch (error) {
            res.status(500).json({ message: "Ocorreu um erro ao editar esse usuário, por favor, tente novamente mais tarde." })
        }

    

    }

    static async removeUserById(req, res){
        const { id } = req.params;

        try {
            await User.destroy({where: {id:id}})

            res.status(200).json({message: "O usuário foi removido com sucesso!"})
        } catch (error) {
            res.status(500).json({ message: "Ocorreu um erro ao remover o usuário, por favor, tente novamente mais tarde." })
        }
    }

}

export default UserController;
