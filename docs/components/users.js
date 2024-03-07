export default {
    Users: {
        type: "Object",
        properties: {
            name: {
                type: "string",
                description: "Nome",
                example: "João da Silva",
                required: true
            },
            email: {
                type: "string",
                description: "Email",
                example: "joaosilva@email.com",
                required: true
            },
            password: {
                type: "string",
                description: "Senha",
                example: "joaosilva123",
                required: true
            },
            confirmpassword: {
                type: "string",
                description: "Confirmar senha",
                example: "joaosilva123",
                required: true
            }
        }
    },
    UsersPatch: {
        type: 'Object',
        properties: {
            name: {
                type: "string",
                description: "Nome",
                example: "João da Silva",
                required: "true"
            },
            email: {
                type: "string",
                description: "Email",
                example: "joaosilva@email.com",
                required: "true"
            },
            password: {
                type: "string",
                description: "Senha",
                example: "joaosilva123",
                required: false
            },
            confirmpassword: {
                type: "string",
                description: "Confirmar senha",
                example: "joaosilva123",
                required: false
            }
        }
    },
    UsersResponse: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "Nome",
                example: "João da Silva",
            },
            email: {
                type: "string",
                description: "Email",
                example: "joaosilva@email.com",
            },
            password: {
                type: "string",
                description: "Senha",
                example: "joaosilva123",
            },
            createdAt: {
                type: "string",
                description: "Data de criação",
                example: "2024-03-07T13:59:56.000Z"
            },
            updatedAt: {
                type: "string",
                description: "Data de atualização",
                example: "2024-03-07T13:59:56.000Z"
            }
        }
    },
    ClientsResponseGet: {
        type: "array",
        items: {
            $ref: "#/components/schemas/UsersResponse"
        }
    }
}