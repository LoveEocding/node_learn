console.log(__filename);
console.log(__dirname);

//默认情况 this 是一个空对象。和global不一样
console.log(this);

(function(){
 console.log(this==global) //true 因为默认是在global环境调用的函数
}())

//process 资源 CPU 内存
console.log(process.memoryUsage());
console.log(process.cpuUsage());

//运行环境，运行目录，node环境 ，cpu架构、用户环境、系统平台
console.log("🚀 ~ file: node-global.ts ~ line 17 ~ process.cwd()", process.cwd())
console.log("🚀 ~ file: node-global.ts ~ line 17 ~ process.cwd()", process.version)
console.log("🚀 ~ file: node-global.ts ~ line 17 ~ process.cwd()", process.versions)
console.log("🚀 ~ file: node-global.ts ~ line 17 ~ process.cwd()", process.arch)
console.log("🚀 ~ file: node-global.ts ~ line 17 ~ process.cwd()", process.env.NODE_ENV) //环境变量
console.log("🚀 ~ file: node-global.ts ~ line 17 ~ process.cwd()", process.env.PATH)
console.log("🚀 ~ file: node-global.ts ~ line 17 ~ process.cwd()", process.platform)

//运行状态：启动参数、PID、运行时间
console.log(process.argv);

console.log(process.execArgv);

console.log("🚀 ~ file: node-global.ts ~ line 31 ~ process.pid", process.pid)

//运行时间
console.log("🚀 ~ file: node-global.ts ~ line 33 ~ process.uptime()", process.uptime())


//事件
process.on('exit',code=>{
console.log("🚀 ~ file: node-global.ts ~ line 38 ~ code", code);
})

process.on('beforeExit',code=>{
console.log("🚀 ~ file: node-global.ts ~ line 42 ~ code", code);  
})

console.log('代码执行完成');

//手动执行退出
process.exit();


//标准输出 输入 错误 是一个流的操作

console.log =function(val){
  process.stdout.write('--'+val);
}

//接受输入
process.stdin.pipe(process.stdout);

process.stdin.setEncoding('utf-8');
process.stdin.on('readable',()=>{
    let chunk=process.stdin.read();
    if(chunk!==null){
       process.stdout.write('data'+chunk);
    }
})