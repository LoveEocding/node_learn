const { Socket } = require('dgram');
const net=require('net');

//创建服务
const server=net.createServer();


server.listen(1234,'localhost');


server.on('listening',()=>{
    console.log('服务端已经开启');
})

//监听链接
server.on('connection',(socket)=>{
    socket.on('data',(chunk)=>{
        let msg=chunk.toString();
        console.log(msg);
        //回消息
        socket.write(Buffer.from('您好'+msg));

    })
})

server.on('close',()=>{
    console.log('服务关闭了');
})

server.on('error',(err)=>{
    if(err.code==='EADDRINUSE'){
        console.log('端口已经被使用了');
    }else{
        console.log(err);
    }
})