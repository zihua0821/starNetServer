const dgram = require('dgram');

const udpServer = dgram.createSocket("udp4");
udpServer.bind(7777);

// 监听端口
udpServer.on('listening', function () {
    console.log('udp server linstening 7777.');
})

//接收消息
udpServer.on('message', function (msg, rinfo) {
    strmsg = msg.toString() + " ok!";
    udpServer.send(strmsg, 0, strmsg.length, rinfo.port, rinfo.address); //将接收到的消息返回给客户端
    console.log(`udp server received data: ${msg.toString()} from ${rinfo.address}:${rinfo.port}`)
})
//错误处理
udpServer.on('error', function (err) {
    console.log('some error on udp server.')
    udpServer.close();
})