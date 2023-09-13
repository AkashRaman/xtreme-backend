const express = require("express");
 

const recordRoutes = express.Router();
 

const dbo = require("../db/conn");
 

const ObjectId = require("mongodb").ObjectId;
 
 
recordRoutes.route("/").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name
 };

 db_connect.collection("records").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});

recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name
   },
 };
 db_connect
   .collection("records")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 

recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("records").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;