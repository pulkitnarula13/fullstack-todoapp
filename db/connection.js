const mongoose = require("mongoose");

// Connection with MongoDB
let mongoDB = `mongodb+srv://root:root@cluster0.yr5blvl.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose.connection;