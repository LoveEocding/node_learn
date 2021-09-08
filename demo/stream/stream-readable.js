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