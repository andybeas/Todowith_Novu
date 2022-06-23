const express = require('express')
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")
const { NovuNotification } = require('./novu.js');

const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost/todoApp")
    .then(() => console.log("connection successfull"))
    .catch((err) => console.log(err));


const todoSchema = new mongoose.Schema({
    TodoHeading: String,
    Email: String,
});


const Todo = mongoose.model("Todo", todoSchema);


app.get("/", async (req, res) => {

    try {
        const resJson = await Todo.find({})
        res.json(resJson).status(200)
    } catch (error) {
        console.log(error);
    }
})

app.post("/", async (req, res) => {

    const { TodoHeading, Email } = req.body;

    if (!Email || !TodoHeading) {
        res.json("Form incomplete").status(400);

    }

    try {
        const newTodo = await Todo.create({ TodoHeading, Email });

        console.log(newTodo._id)
        const id = newTodo._id

        NovuNotification(TodoHeading, Email, id);

        res.json(newTodo).status(201)

    } catch (error) {
        res.json(error).status(500);
    }

})


app.delete("/", async (req, res) => {

    try {
        const deletedTodo = await Todo.deleteMany({})
        res.json(deletedTodo).status(200)

    } catch (error) {
        console.log(error);
    }

})

app.listen(PORT, () => {
    console.log("listening at port", PORT)
})
