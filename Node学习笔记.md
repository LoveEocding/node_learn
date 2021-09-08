### Path

basename() 获取路径中基础名称

dirname() 获取路径中目录名称

extname() 获取路径中扩展名称

isAbsolute() 获取路径是否为绝对路径

join() 拼接多个路径片段

resolve() 返回绝对路径

pasre() 解析路径

format() 序列化路径

normalize() 规范化路径

```javascript
const path=require('path')

const log=(val)=>{
   console.log(val);
}

//获取文件全部名称
log(__filename);

/**
 * 01 返回接受路径的最后一部分
 * 02 第二个参数表示扩展名，如果没有就返回完整带后缀名，如果有，就会忽略后缀
 */
log(path.basename(__filename)) //path.js
log(path.basename(__filename,'.js')) //path
log(path.basename('/a/b/c')) //c
log(path.basename('/a/b/c/')) //c 有分隔符自动忽略掉


/**
 * 01:接受路径的目录名
 * 02:最后有分隔符会被忽略掉
 */
log(path.dirname(__filename)) //C:\Users\Yao.Nie\Desktop\mynode

/**
 * 01:返回接受路径的后缀
 * 02:规则获取最后一个点 后面的后缀
 */
log(path.extname(__filename)) //.js
log(path.extname('a/b/c')) //空

log(path.join('a/','b')) //a\b

//解析路径
/**
 * {
  root: 'C:\\',
  dir: 'C:\\Users\\Yao.Nie\\Desktop\\mynode',
  base: 'path.js',
  ext: '.js',
  name: 'path'
}
 */
log(path.parse(__filename)); 

//绝对路径 第二个参数可以对路径操作
log(path.resolve(__filename,'../'));

//规范化 把一些不规范的路径，变成规范
log(path.normalize('///a///b//c')); // a/b/c

//根据对象格式化路径 序列化
log(path.format(path.parse(__filename)));

//是否是绝对路径
log(path.isAbsolute('a'))  //false
```

### Buffer

1、无须require的一个全局变量

2、实现nodejs平台下的二进制数据操作

3、是一片内存空间，不占据v8内存堆大小，底层C++

4、内存的使用由Node来控制，由V8的GC回收

5、一般配合Stream流使用，充当数据缓冲区



#### 创建buffer

```javascript
const b1=Buffer.alloc(10) //申请指定大小的buffer 00 00 00 00 
const b2=Buffer.allocUnsafe(10) //不安全的创建方法，只有有空余的时间就拿过来 08 00 000 00

//2.from  value|arr   转换成对应的 字符编码字节
const b3=Buffer.from('1') // 1 对应字符编码表 31  输出31 
const b4=Buffer.from([1,2,'中'],'urf8')// 01 02 e4 b8 ad 一个中文对应3个字节

b4.toString(); //将字符编码 编译成原有字符

const b1=Buffer.alloc(3);
const b2=Buffer.from(b1);
b1!==b2 //实际上 b2是拷贝。两个不执向同一个空间


```

#### Buffer 实例方法

fill :使用数据填充buffer （value,begIndex,endIndex）如果指定buffer大小，偏大会一直填充。直到填充满。如果不够就截取

1. write:向buffer写入数据  （value,begindex,length） 区别fill 有多少填充多少
2. toString:从buffer中提取数据  (encode,begindex,endIndex) 
3. slice : 截取buffer数据 (begindex,endindex)
4. indexof: 查找数据是否存在  (value)
5. copy : 拷贝的操作 （writeBuffere,wirtebegIndex,readIndex,readEnd）



#### Buffer 静态方法

1、concat:将多个buffer拼接成一个buffer (arr,length)

```
let b=Buffer.concat([b1,b2],9)
```

2、isBuffer:是否是buffer



#### Buffer 之 split

```
ArrayBuffer.prototype.splite=function(sep){
    let len=Buffer.from(sep).length;
    let res=[];
    let start=0;
    let offset=0;
    while(offset=this.indexof(sep,start)!==-1){
      res.push(this.slice(start,offset));
      start=offset+len;
    }
    return res;
    
}
```



### FS模块

FS是内置核心模块，提供文件系统操作的API

![image-20210820102310778](C:\Users\Yao.Nie\Desktop\Node学习笔记.assets\image-20210820102310778.png)

 ![image-20210820102622682](C:\Users\Yao.Nie\Desktop\Node学习笔记.assets\image-20210820102622682.png)

![image-20210820102725995](C:\Users\Yao.Nie\Desktop\Node学习笔记.assets\image-20210820102725995.png)

![image-20210820104018200](C:\Users\Yao.Nie\Desktop\Node学习笔记.assets\image-20210820104018200.png)

#### 文件读写与拷贝操作

readFile:从指定文件中读取数据 

writeFile:从指定文件写入数据  options:{mode:438权限,flag:'w+'方式,encoding:'utf-8'编码}

appendFile:追加的方式，向指定文件写入数据

copyFile:将某个文件中的数据拷贝到另外一个文件

watchFile:对指定文件进行监控 options:{interval:20 多少毫秒监控一次}

unwathchFile:取消监控



####  文件打开与关闭

```
fs.open(fileName,'r',(err,fd)=>{
   console.log(fd);
   fs.close(fd,err=>{
      console.log('关闭成功')；
   })
})


```



#### 大文件读写操作

```
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
```



#### 大文件拷吧自定义实现

```
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
```



#### FS 之目录操作API

![image-20210906100822153](/Users/gymd/Library/Application Support/typora-user-images/image-20210906100822153.png)

```
const fs=require('fs')

//判断是否有操作权限
fs.access('a.txt',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('有操作权限');
    }
})

// stat 目录信息
fs.stat('a.txt',(err,statObj)=>{
    console.log(statObj.size());
    console.log(statObj.isFile())
    console.log(statObj.isDirectory());
})

//递归创建目录
fs.mkdir('a/b/c',{recursive:true},(err)=>{

})

//删除目录 默认是删除baseName 可以使用递归
fs.rmdir('a/b/c',(err)=>{

})

//读取目录
fs.readdir('a',(err,files)=>{
    console.log(files);
    //这里可以递归读取
})


//删除文件
fs.unlink('a/a.txt',(err)=>{
    
})
```



#### 目录创建同步(模拟自定义)

```
const fs=require('fs');
const path=require('path');


/**
 * 1 将来调用时需要接受类似 a/b/c 分割递归创建
 * 
 */

function makeDirSync(dirPath){
    let items=dirPath.splite(path.sep);
    for(let i=1;i<=items.length;i++){
        let dir=items.slice(0,i).join(path.sep);
        try{
           fs.accessSync(dir);
        }catch(err){
           fs.mkdirSync(dir);
        }
    }
}
```



#### 目录创建异步（模拟自定义）

```
const fs=require('fs');
const path=require('path');
const { promisify } =require('util');


//将access 与 mkdir 处理成 async 风格

const access=promisify(fs.access);
const mkdir=promisify(fs.mkdir);

async function myMkdir(dirPath,cb){
    let parts=dirPath.split('/');
    for(let index=1;index<=parts.length;index++){
        let current=parts.slice(0,index).join('/');
        try{
            await access(current);
        }catch(err){
            await mkdir(current);
        }
    }
    cb&&cb();
}
```

### 模块化

![image-20210906144416348](/Users/gymd/Library/Application Support/typora-user-images/image-20210906144416348.png)

![image-20210906144530552](/Users/gymd/Library/Application Support/typora-user-images/image-20210906144530552.png)

#### 模块分类及加载流程

1、内置模块：Node源码编译时写入到二进制文件中。

2、文件模块：代码运行时，动态加载。

![image-20210907103118876](/Users/gymd/Library/Application Support/typora-user-images/image-20210907103118876.png)

![image-20210907103644679](/Users/gymd/Library/Application Support/typora-user-images/image-20210907103644679.png)

![image-20210907103835945](/Users/gymd/Library/Application Support/typora-user-images/image-20210907103835945.png)

![image-20210907104017721](/Users/gymd/Library/Application Support/typora-user-images/image-20210907104017721.png)

![image-20210907104333636](/Users/gymd/Library/Application Support/typora-user-images/image-20210907104333636.png)

![image-20210907104423625](/Users/gymd/Library/Application Support/typora-user-images/image-20210907104423625.png)

#### 内置模块VM

用途：创建独立运行的沙箱环境



### 事件模块

发布订阅模式

```
const Event=reuqire('events');
const ev=new EventEmitter();
ev.on('event1',()=>{
  console.log('注册事件')；
})
ev.emit('event1')

//执行一次
ev.once('event2',()=>{
  //只执行一次事件
})

//注销事件
ev.off('event1',cbfn);
```





### 游览器中的Eventloop

![image-20210907145353872](/Users/gymd/Library/Application Support/typora-user-images/image-20210907145353872.png)

![image-20210907150216376](/Users/gymd/Library/Application Support/typora-user-images/image-20210907150216376.png)





### NodeJs 下的事件环 6个队列

![image-20210907150337922](/Users/gymd/Library/Application Support/typora-user-images/image-20210907150337922.png)

![image-20210907150518673](/Users/gymd/Library/Application Support/typora-user-images/image-20210907150518673.png)

![image-20210907150950554](/Users/gymd/Library/Application Support/typora-user-images/image-20210907150950554.png)

![image-20210907151638225](/Users/gymd/Library/Application Support/typora-user-images/image-20210907151638225.png)

#### nodes 事件循环常见问题

![image-20210907154950105](/Users/gymd/Library/Application Support/typora-user-images/image-20210907154950105.png)

settimeout 这个0可能有延时，所以执行循序是随机的



### stream 流



![image-20210907155605271](/Users/gymd/Library/Application Support/typora-user-images/image-20210907155605271.png)

![image-20210907155728686](/Users/gymd/Library/Application Support/typora-user-images/image-20210907155728686.png)



![image-20210907155914757](/Users/gymd/Library/Application Support/typora-user-images/image-20210907155914757.png)



#### 自定义可读流

![image-20210907160518855](/Users/gymd/Library/Application Support/typora-user-images/image-20210907160518855.png)

![image-20210907160726255](/Users/gymd/Library/Application Support/typora-user-images/image-20210907160726255.png)



```
const { Readable }=require('stream');

let source=['lg','zce','syy'];

class MyReadAble extends Readable{
    constructor(source){
        super();
        this.source=source;
    }
    _read(){
        let data=this.source.shift()||null;
        this.push(data);
    }
}

let myReadAble=new MyReadAble(source);

//暂停模式 手动触发读取
myReadAble.on('readable',()=>{
    let data=null;
    while((data=myReadAble.read(2))!==null){
        console.log(data.toString());
    }
})

//流动模式
myReadAble.on('data',(chunk)=>{
    console.log(chunk.toString());
})
```



####  自定义可写流

![image-20210907162129751](/Users/gymd/Library/Application Support/typora-user-images/image-20210907162129751.png)

![image-20210908101515173](/Users/gymd/Library/Application Support/typora-user-images/image-20210908101515173.png)

```
const {Writeable}=require('stream');
class MyWriteable extends Writeable{
   constructor(){
      super();
   }
   _write(chunk,en.done){
      process.stdout.write(chunk.tostring()+'<---');
      process.nextTick(done);
   }
}

myWriteable.write('拉钩教育','urf-8',()=>{
  console.log(end);
})
```

#### 自定义双工流/转换流

##### duplex

![image-20210908102329460](/Users/gymd/Library/Application Support/typora-user-images/image-20210908102329460.png)

##### transform

![image-20210908102532271](/Users/gymd/Library/Application Support/typora-user-images/image-20210908102532271.png)





#### 文件可读流使用

```
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


```

#### 文件可写流使用

```
const fs=require('fs');

const ws=fs.createWriteStream('test.txt',{
    flags:'w',
    mode:438,
    fs:null,
    encoding:'utf-8',
    start:0,
    highWaterMark:4,
    autoClose:true
})

//写入数据 字符串｜buffer
ws.write('拉钩教育',()=>{
    //数据写完了
})

//打开文件 回调
ws.on('open',(fd)=>{
    //finish fd
})
//文件关闭数据全部完成后执行  只有当ws.end 才执行后
ws.on('close',()=>{
    //finish
})
//报错
ws.on('error',()=>{
    //出错
})
ws.on('finish',()=>{
    //finish
})
```



#### write 执行流程

![image-20210908142732668](/Users/gymd/Library/Application Support/typora-user-images/image-20210908142732668.png)



#### 控制写入速度

drain与写入速度

```javascript
/**
 *  需求：拉钩教育写入指定的文件
 *  01 一次性写入
 *  02 分批写入
 */

 let fs=require('fs');
 let ws=fs.createWriteStream('test.txt',{
     highWaterMark:3
 });
  
 ws.write('拉钩教育');


 //分批写入
 let source="拉钩教育".split('');
 let num=0
 let flag=true
 function executeWrite(){
      flag=true
      while(num!=4&&falg){
          flag= ws.write(source[num]);
          num++;
      }
 }

 executeWrite();
 
 //这里检查到可以继续写入的时候
 ws.on('drain',()=>{
     //再次执行写入
     executeWrite();
 })
```



#### 背压机制

当消费速度，小于生产速度，会产生内存溢出，GC频繁调用，其他进程变慢，所以需要背压机制**（pipe实现原理）**

![image-20210908145334004](/Users/gymd/Library/Application Support/typora-user-images/image-20210908145334004.png)

![image-20210908145503124](/Users/gymd/Library/Application Support/typora-user-images/image-20210908145503124.png)

```javascript
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
```







### 通信

<img src="/Users/gymd/Library/Application Support/typora-user-images/image-20210908151438718.png" alt="image-20210908151438718" style="zoom:33%;" />





#### 网络通信方式

<img src="/Users/gymd/Library/Application Support/typora-user-images/image-20210908151606886.png" alt="image-20210908151606886" style="zoom: 25%;" />

局域网通信：不足，端口有上限，造成广播风暴

<img src="/Users/gymd/Library/Application Support/typora-user-images/image-20210908152006808.png" alt="image-20210908152006808" style="zoom:25%;" />





#### 网络层次模型

#### 1、OSI 7层模型

#### <img src="/Users/gymd/Library/Application Support/typora-user-images/image-20210908152712805.png" alt="image-20210908152712805" style="zoom: 25%;" />                   

   ####  2、TCP 5层模型

​    应用层、表示层、会话层合并成应用层



#### 数据封装与解封装

<img src="/Users/gymd/Library/Application Support/typora-user-images/image-20210908153911686.png" alt="image-20210908153911686" style="zoom: 50%;" />



#### TCP 三次握手与四次挥手

 1、tcp 报文

 <img src="/Users/gymd/Library/Application Support/typora-user-images/image-20210908154154709.png" alt="image-20210908154154709" style="zoom:25%;" />

2、常见控制字段



<img src="/Users/gymd/Library/Application Support/typora-user-images/image-20210908154233689.png" alt="image-20210908154233689" style="zoom:25%;" />

**3次握手**

<img src="/Users/gymd/Library/Application Support/typora-user-images/image-20210908154451093.png" alt="image-20210908154451093" style="zoom:33%;" />

**4次挥手**

<img src="/Users/gymd/Library/Application Support/typora-user-images/image-20210908155222362.png" alt="image-20210908155222362" style="zoom: 33%;" />

为什么有第4次挥手。 因为一个服务端服务多个客户端，并不能马上告诉客户端说关闭，等所有数据发送完成才关闭。



#### 创建TCP 通信

1、net 模块实现了底层通信接口

![image-20210908155637998](/Users/gymd/Library/Application Support/typora-user-images/image-20210908155637998.png)

![image-20210908160027161](/Users/gymd/Library/Application Support/typora-user-images/image-20210908160027161.png)

   ###### 创建服务端

```javascript
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
```

###### 创建客户端

```
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
```



