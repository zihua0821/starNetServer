const Sequelize = require('sequelize');
const seq = require('../seq');
const User = require('./user');

let Character = seq.define('character', {
    character_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        unique:false
    },
    name: {
        type: Sequelize.STRING, 
        allowNull: false,
        unique: true
    },
    model_id: {
        type: Sequelize.INTEGER, 
        allowNull: true,
        unique: false
    }
}, {
    freezeTableName: true, // 告诉sequelize不需要自动将表名变成复数
    timestamps: true // 需要自动创建createAt/updateAt这两个字段
});

Character.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = Character