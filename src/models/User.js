w

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

export { User }