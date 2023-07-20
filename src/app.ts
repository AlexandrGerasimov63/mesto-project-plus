import express from "express";
import mongoose from "mongoose";


const app = express()
const {PORT=3000}= process.env

mongoose.connect('mongodb://localhost:27017/mestodb')

app.listen(PORT, ()=>{
  console.log(`Сервер запущен на ${PORT} порту`)
})