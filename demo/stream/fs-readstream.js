const fs=require('fs');
const { resolve } = require('path');
let rs=fs.createReadStream('./data/a.txt',{
    flags:'r',
    encoding:null,
    fd:null,
    mode:438,
    autoClose:true,
    start:0,
    end:3,
    highWaterMark:4 //每次缓冲区 存几个字节
})

//消费 流动模式
rs.on('data',(chunk)=>{
    console.log(chunk.toString());
    rs.pause();// 暂停流
    setTimeout(() => {
        rs.resume();//继续流
    }, 1000);
})

//readable 读取
rs.on('readable',()=>{
    let data;
    //每次从缓冲区读两个字符
    while((data=rs.read(2))!==null){
        console.log(data.toString);
        console.log('-----',rs._readableState.length);// 目前缓冲区还有几个字节
    }
})

