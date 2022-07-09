const {getUser,createUser} = require('./dbController')


async function userExists(email) {
    let users = await getUser(email);
    return users.length !== 0;
}
async function create(email,password){
    let data = new Object();
    data.email = email;
    data.password = password;
    let code = await createUser(data);
    return code;
}
async function checkPSW(email,password) {
    let users = await getUser(email,password);
    return users;
}
module.exports = {
    userExists,
    create,
    checkPSW
}