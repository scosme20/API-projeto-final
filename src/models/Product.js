import { sequelize as db } from "../db/conn.js";
import { Sequelize, DataTypes, INTEGER } from "sequelize";
import Company from "./Company.js"

const Product = db.define('Product', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    }})

    Product.belongsTo(Company)
    Company.hasMany(Product)

    export default Product