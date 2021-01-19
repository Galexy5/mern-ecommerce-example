require("dotenv").config();
const express=require('express');
const app=express();
const dbConnection=require('./db');

dbConnection();


const port=process.env.PORT || 5000

app.listen(port, ()=> console.log(`Listening to: ${port}`)
)