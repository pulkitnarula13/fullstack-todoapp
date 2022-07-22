const express = require("express");
const app = express();

const db = require('./db/connection.js')

// Connection with MongoDB
db.once('open', ()=>{
    console.log('Successfully connected to database!')
    const server = app.listen(8080,()=>console.log("Listening to port 8080"));
})

app.use(express.static("public"));

// the following two lines are needed to pass the data to MongoDB in JSON format
app.use(express.json()) 
app.use(express.urlencoded({extended:true}));

//Database schema 
const { Todo } = require('./models/Todo')

//API Routes

app.post("/api/toDo", (req, res) => {
    let todo = new Todo(req.body)
    console.log("to do at server")
    console.log(todo)
    todo.save((error) => {
      if (error) {
        res.json(error)
      } else {
        res.json({ data: todo, message: "Todo task created successfully!!!!" })
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
