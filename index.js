import express from 'express';
import cors from 'cors';
import rotaAnimais from './rotaAnimais.js';



const app = new express();
app.use(cors({origin:"*"}));

//Faz com que o body seja lido corretamente, pois passa a usar a biblioteca query
 app.use(express.urlencoded({extended:false})); 

//configura para a processar corretamente o formato Json
 app.use(express.json());

 app.use('/animais',rotaAnimais);

 const porta=4034;
 const hostname = '0.0.0.0';
 
 app.listen(porta,hostname,()=>{
     console.log("Backend ouvindo em http://"+hostname+":"+porta);
 });
