const express = require('express');
const app=express();

const bodyParser=require('body-parser');
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
const { GoogleGenerativeAI } = require("@google/generative-ai");

const dotenv = require("dotenv");
dotenv.config();

app.post('/getResponse',(req,res)=>{
    console.log(req.body.question);

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    model.generateContent(req.body.question).then(result=>{
        console.log(result.response.text());
        const response=result.response.text();
        res.status(200).json({
            response:response
        })
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
   
})

app.get('/abc',(req,res)=>{
    console.log('hi');
})

module.exports=app;