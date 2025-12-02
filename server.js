import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(() => console.log(err));

const Todo = mongoose.model("Todo", new mongoose.Schema({
  text:String
}));

app.get("/todos", async (req, res) => {
  res.json(await Todo.find());
});

app.post('/todos', async(req,res) => {
  const todo=await Todo.create({ text:req.body.text});
  res.json(todo);
})

app.delete("/todo/:id", async(req,res)=>{
  await Todo.findByIdAndDelete(req.paramas.id);
  res.json({message : "Deleted"})
})

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
)
