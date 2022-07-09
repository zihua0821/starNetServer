const User = require('../db/model/user');
const Character = require('../db/model/character');
const MSG = require('../db/model/msg')

/**
 * 根据用户名获取用户信息
 * @param email 被获取的用户名
 * @param [password] 密码
 * @returns {Promise<*>}
 */
async function getUser(email, password) {
    if (password) {
        let results = await User.findAll({
            where: {
                email: email,
                password: password
            }
        });
        return results;
    } else {
        let results = await User.findAll({
            where: {
                email: email
            }
        });
        return results;
    }
}
/**
 * 数据库中创建用户
 * @param data 用户数据
 * @returns
 */

async function createUser(data) {
    let results = await User.create({
        email: data.email,
        password: data.password,
    });
    return results['dataValues'];
}

async function createCharacter(data) {
    let results = await Character.create({
        user_id: data.user_id,
        model_id: data.model_id,
        name: data.name
    });
    return results['dataValues'];
}

async function getCharacter(user_id) {
    let results = await Character.findAll({
        where: {
            user_id: user_id
        }
    });
    return results;
}

async function isCharacterExist(name) {
    let results = await Character.findAll({
        where: {
            name: name
        }
    });
    return results.length !== 0;
}

async function logMSG(data) {
    let results = await MSG.create({
        user_id: data.user_id,
        character_id: data.character_id,
        name: data.name,
        msg: data.msg
    });
    return results['dataValues'];
}

module.exports = {
    getUser,
    createUser,
    createCharacter,
    getCharacter,
    isCharacterExist,
    logMSG
}