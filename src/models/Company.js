import { sequelize as db } from "../db/conn.js"
import { Sequelize, DataTypes } from "sequelize"

const Company = db.define('Company', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: { min: 0, max: 5 },
        defaultValue: 0,
        allowNull: false,
    },
    productQty: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
     },
     password: {
         type: DataTypes.STRING,
         allowNull: false
     }
})

export default Company;