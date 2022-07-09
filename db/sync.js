const seq = require('./seq');

// 0.导入模型
require('./model/user');
require('./model/character');
require('./model/msg');

// 1.测试配置是否正确
seq.authenticate()
    .then(()=>{
        console.log('DB config ok');
    })
    .catch((err)=>{
        console.log("配置错误：" + err);
    });

// 2.执行同步方法, 创建表
seq.sync().then(()=>{
    console.log('table sync ok');
});