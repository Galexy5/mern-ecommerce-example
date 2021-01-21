require("dotenv").config();
const express=require('express');
const cors=require('cors');
const morgan=require('morgan');
const app=express();
const dbConnection=require('./db');
const authRoutes=require('./routes/auth');


//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/user', authRoutes);

//DB Connection
dbConnection();



const port=process.env.PORT || 5000

app.listen(port, ()=> console.log(`Listening to: ${port}`)
)