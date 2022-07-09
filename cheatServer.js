const { logMSG } = require('./controller/dbController')

const net = require('net');
const server = new net.Server()
const PORT = 8801;
const HOST = "127.0.0.1";

server.listen(PORT);
var sockets = [];
server.on('connection', socket => {
    console.log('some connected');
    if (!isExist(socket)) {
        sockets.push(socket);
    }
    socket.on('data', async data => {
        var info = JSON.parse(data.toLocaleString());
        switch (info.status) {
            case 'msg':
                logMSG(info);
                var backInfo = {};
                backInfo.status = 210;
                backInfo.name = info.name;
                backInfo.msg = info.msg;
                var str = JSON.stringify(backInfo);
                worldBroadcast(str);
        }

    });
    socket.on('close', () => {
        remove(socket);
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

function worldBroadcast(info) {
    sockets.forEach(socket => {
        socket.write(info, 'utf-8');
    });
}

function remove(val) {
    sockets = sockets.filter(item => {
        return item !== val;
    });
}

function isExist(val) {
    return !!sockets.find(e => e === val);
}
