require('./db/sync');
const { userExists, create, checkPSW } = require('./controller/loginController');
const { createCharacter, getCharacter ,isCharacterExist } = require('./controller/dbController')
const net = require("net");
const PORT = 8800;
const HOST = '127.0.0.1';
var backInfo = {
    status: 200,
}

const server = new net.Server();
server.listen(PORT);

server.on('connection', socket => {
    console.log('some connected');
    socket.on('data', async data => {
        console.log(`receive ${data.toLocaleString()}`);
        var info = JSON.parse(data.toLocaleString());
        switch (info.status) {
            case 'login':
                var code = await userExists(info.email);
                if (code) {
                    var backInfo = {};
                    backInfo.status = 200;
                    var str = JSON.stringify(backInfo);
                    socket.write(str, 'utf-8');
                } else {
                    var backInfo = {};
                    backInfo.status = 404;
                    var str = JSON.stringify(backInfo);
                    socket.write(str, 'utf-8');
                }
                break;
            case 'createUser':
                var code = await create(info.email, info.password);
                var backInfo = {};
                backInfo.status = 201;
                backInfo.user_id = code.user_id;
                var str = JSON.stringify(backInfo);
                socket.write(str, 'utf-8');
                break;
            case 'loginNow':
                var code = await checkPSW(info.email, info.password);
                var data = code[0];
                if (code.length !== 0) {
                    var backInfo = {};
                    backInfo.status = 202;
                    backInfo.user_id = data.user_id;
                    var str = JSON.stringify(backInfo);
                    socket.write(str, 'utf-8');
                } else {
                    var backInfo = {};
                    backInfo.status = 203;
                    var str = JSON.stringify(backInfo);
                    socket.write(str, 'utf-8');
                }
                break;
            case 'createCharacter':
                var check = await isCharacterExist(info.name);
                if (!check) {
                    var res = await createCharacter(info);
                    var backInfo = {};
                    backInfo.status = 204;
                    
                    var str = JSON.stringify(backInfo);
                    socket.write(str, 'utf-8');
                }else{
                    var backInfo = {};
                    backInfo.status = 500;
                    var str = JSON.stringify(backInfo);
                    socket.write(str, 'utf-8');
                }
                break;
            case 'checkCharacter':
                var res = await getCharacter(info.user_id);
                if (res.length === 0) {
                    var backInfo = {};
                    backInfo.status = 405;
                    var str = JSON.stringify(backInfo);
                    socket.write(str, 'utf-8');
                }else{
                    var backInfo = {};
                    backInfo.status = 205;
                    backInfo.count = res.length;
                    var array = [];
                    for (let index = 0; index < res.length; index++) {
                        array[index] = res[index]['dataValues'];
                    }
                    backInfo.characters = array;
                    var str = JSON.stringify(backInfo);
                    socket.write(str, 'utf-8');
                }
                

                break;

            default:
                break;
        }
    });
    socket.on('close', () => {
        console.log('someone closed');
    });
    socket.on('error', () => {
        console.log('error!!!');
    });
});

server.on('listening', () => {
    console.log(`Creat server on http:/${HOST}:${PORT}/`);
});
server.on('close', () => {
    console.log('server closed');
});
server.on('error', error => {
    console.log('error!!!!!');
});


