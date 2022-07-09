const Sequelize = require('sequelize');
const seq = require('../seq');
const Character = require('./character')
/*
第一个参数: 用于指定表的名称
第二个参数: 用于指定表中有哪些字段
第三个参数: 用于配置表的一些额外信息
* */
/*
注意点:
1.sequelize在根据模型创建表的时候, 会自动将我们指定的表的名称变成复数
2.sequelize在根据模型创建表的时候, 会自动增加两个字段 createAt/updateAt
* */
let MSG = seq.define('msg', {
    msg_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    character_id: {
        type: Sequelize.INTEGER,
    },
    name: {
        type: Sequelize.STRING,
        references: {
            model: Character,
            key: 'name'
        }
    },
    msg: {
        type: Sequelize.STRING,
    }
}, {
    freezeTableName: true, // 告诉sequelize不需要自动将表名变成复数
    timestamps: true // 
});



module.exports = MSG;