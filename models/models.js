const sequelize = require('../db')
const { DataTypes } = require("sequelize")


const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
})



const Post = sequelize.define('posts', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    content: {type: DataTypes.STRING},
    photo: {type: DataTypes.STRING, allowNull: true}
})

module.exports = {User, Post}


User.hasMany(Post)
Post.belongsTo(User)