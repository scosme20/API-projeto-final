import { sequelize as db } from "../db/conn.js"
import { Sequelize, DataTypes } from "sequelize"

const User = db.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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

export default User;