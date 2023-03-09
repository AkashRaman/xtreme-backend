const { MongoClient } = require("mongodb");
const mongoose = require("mongoose")
const Db = process.env.ATLAS_URI;
mongoose.connect('mongodb+srv://Raman:1234@cluster0.aklelgh.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
var _db;

module.exports = {
  connectToServer: function () {
    // client.connect(function (err, db) {
    //   // Verify we got a good "db" object
    //   console.log(db);
    //   if (db)
    //   {
    //     _db = db.db("employees");
    //     console.log("Successfully connected to MongoDB."); 
    //   }
    //   return callback(err);
    //      });
    
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", ()=> {
        console.log("Database connected");
    });
  },
 
  getDb: function () {
    return _db;
  },
};