require("dotenv").config();
const express=require('express');
const cors=require('cors');
const morgan=require('morgan');
const cookieParser=require('cookie-parser');
const app=express();
const dbConnection=require('./db');
const authRoutes=require('./routes/auth');
const adminDashRoutes=require('./routes/adminDashboard');
const categoryRoutes=require('./routes/category');
const productRoutes = require('./routes/product')

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/', authRoutes);
app.use('/admin/dashboard/', adminDashRoutes);
app.use('/categories/', categoryRoutes);
app.use('/products', productRoutes);
app.use('/uploads', express.static('uploads'))   //Middleware so that react can get photos from uploads folder


//DB Connection
dbConnection();



const port=process.env.PORT || 5000

app.listen(port, ()=> console.log(`Listening to: ${port}`)
)