const fs=require('fs');


let buf=Buffer.alloc(100);
const BUFFER_SIZE=buf.length;
let readOffset=0;

fs.open('./data/a.txt','r',(err,fd)=>{
    fs.open('./data/b.txt','a+',(err,wfd)=>{
    fs.read(fd,buf,0,100,0,(err,read,buffer)=>{
               fs.write(wfd,buf,0,100,0,(err,write,wbuffer)=>{
                   console.log(wbuffer);
               })
           })
    })
})


//递归读取 大文件依次拷贝
function next(fd,wfd){
    fs.read(fd,buf,0,BUFFER_SIZE,readOffset,(err,read,buffer)=>{
        if(!read){
            fs.close(fd);
            fs.close(wdf);
            return;
        }
        readOffset+=BUFFER_SIZE;
        fs.write(wfd,buf,0,100,0,(err,write,wbuffer)=>{
            console.log(wbuffer);å
            next();
        })
    })
}