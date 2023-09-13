const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://Raman:1234@cluster0.aklelgh.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
var _db;

module.exports = {
  connectToServer: function () {
    
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", ()=> {
        console.log("Database connected");
    });
  },
 
  getDb: function () {
    return _db;
  },
};