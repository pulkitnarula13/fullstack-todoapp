const express = require("express");
const app = express();

const db = require('./db/connection.js')

// Connection with MongoDB
db.once('open', ()=>{
    console.log('Successfully connected to database!')
    const server = app.listen(8080,()=>console.log("listening"));
})

app.use(express.static("public"));

// the following two lines are needed to pass the data to MongoDB in JSON format
app.use(express.json()) 
app.use(express.urlencoded({extended:true}));

//Database schema 
const { Todo } = require('./models/Todo')

//API Routes

app.post('/api/toDos', (req,res)=>{
    console.log("Hit the post ", req.body)
    let toDo = new Todo(req.body)
    console.log("Hello" + toDo)

    toDo.save(error=>{
        if(error){
            res.status(500).json(error);
        } else  {
            res.status(201).json({
                message: "New ToDo created",
                data: toDo
            })
        }
    })          
})

// get ToDos

app.get('/api/toDos', (req, res) => {
    Todo.find({})
    .exec((error, result)=>{
        if(error){
            res.send(500).json(error)
        } else {
            res.json(result)
        }
    })
});


// Delete API
