const fs=require('fs');

//read:所谓的读操作就是将数据从磁盘文件写入buffer

let buf=Buffer.alloc(10);

fs.open('data.txt','r',(err,rfd)=>{
    console.log(rfd);
    //buffer开始，读取长度，文本开始位置
    fs.read(rfd,buf,0,3,0,(err,bytes,data)=>{
        console.log(bytes);
        console.log(data); //buffer 16 进制
        console.log(data.toString()) //转换后的 字符串
    });
})


//wirte 将缓冲区里的内容写入到磁盘文件中
buf=Buffer.from('12344');
fs.open('b.txt','w',(err,wfd)=>{
    //buffer开始，读取长度，文本开始位置
    fs.write(wfd,buf,0,4,0,(err,writen,buffer)=>{
        console.log(writen); //写入长度
        console.log(buffer);
    })
})