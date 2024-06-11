import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import cookieParser from 'cookie-parser';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port =process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

connectDB();
const app=express()

app.use(cors({origin:["https://insta-mern-9zfs.onrender.com"],credentials:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)
app.use('/api/upload',uploadRoutes)

if(process.env.NODE_ENV === 'production'){
    
    const __dirname=path.resolve();
    app.use('/uploads', express.static('/var/data/uploads'));
    app.use(express.static(path.join(__dirname,'/frontend/build')));
    
    app.get('*',(req,res) => 
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    );
}else{
    const __dirname=path.resolve();
    console.log('API is running...');
    app.use('/uploads', express.static(path.join(__dirname,'/uploads')))
    app.get('/',(req,res)=>{
    res.send('API is running...')})
}

// app.get('/',(req,res)=>res.send('Server is Ready'))

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>console.log(`Server started on port ${port}`))
