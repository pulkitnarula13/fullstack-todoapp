const mongoose = require("mongoose")

const Schema = mongoose.Schema

//Creating the todo Schema

const TodoSchema = new Schema({

    item: {
        type: String,
        minlength: 1,
        required: true
    },

    type: {
        type: [{type:String}],
        enum: ["study", "chore", "work", "other"]
    },

    description: {
        type: String,
        minlength: 1,
    },

    done: {
        type: Boolean,
        default: false,
    }
})


//Exporting the Schema
exports.Todo = mongoose.model('Todo', TodoSchema)
