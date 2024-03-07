import { sequelize as db } from "../db/conn.js";
import { Sequelize, DataTypes } from "sequelize";
import User from "./User.js"
import Company from "./Company.js"

const Review = db.define('Review', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0, max: 5 },
        defaultValue: 0,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

Review.belongsTo(Company)
Review.belongsTo(User)
Company.hasMany(Review)
User.hasMany(Review)

export default Review