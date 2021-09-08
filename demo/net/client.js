const net =require('net');

const client=net.createConnection({
    port:1234,
    host:'127.0.0.1'
});


//监听链接
client.on('connect',()=>{
   client.write('nieyao');
})

//监听接受数据
client.on('data',(chunk)=>{
    console.log(chunk.toString());
})