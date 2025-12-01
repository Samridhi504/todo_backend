import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connected to MongoDB');})
.catch(()=>{
    console.log('Failed to connect to MongoDB');
})

const Todo = mongoose.model('Todo', new mongoose.Schema({
    text: String
}));

app.get('/todos', async(req,res)=>{
    res.json(await Todo.find());
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})