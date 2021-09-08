let fs=require('fs');

let rs=fs.createReadStream('test.txt',{
    highWaterMark:4
})

let ws=fs.createWriteStream('test1.txt',{
    highWaterMark:1
})

let flag=true;

rs.on('data',(chunk)=>{
    flag=ws.write(chunk,()=>{
        //写完了
    })
    //写入流缓存满了
    if(!flag){
       rs.pause();
    }
})

//写入流 监听缓冲区有空间，然可读流继续流动。
ws.on('drain',()=>{
    rs.resume();
})