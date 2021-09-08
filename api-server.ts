//希望有一个服务，可以根据接口返回数据
import express, { json } from 'express';
import { DataStore } from './data';
const app=express();

app.get('/',(reg,res)=>{
    res.end(JSON.stringify(DataStore.list));
})
app.listen(7000,()=>{
  console.log('服务开启了');
});