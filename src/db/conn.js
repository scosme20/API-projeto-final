import { Sequelize } from "sequelize";

const sequelize = new Sequelize('grocerysearch', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso!')
} catch (error) {
    console.log(`Não conseguimos fazer a conexão, erro: ${error}`)
}
export { sequelize }