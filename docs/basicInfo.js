export default {
    openapi: "3.0.3",
    info: {
        version: "1.0.0",
        title: "GrocerySearch",
        description: "nada",
        contact: {
            name: "Meu nome e meu email"
        }
    },
    servers: [{
        url: "http://localhost:3000",
        description: "Local Server"
    }],
    tags: [
        "Rota users",
        "Rota companies",
        "Rota products",
        "Rota reviews"
    ]
}