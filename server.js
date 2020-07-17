/**
Author: Hassan Alnamer

This is the server I am going to use for the chat
The server runs a Express app and is tied with a mongoDB.
I am going to use the mongoose module to access information from the DB and post to it.
*/
const express = require("express");
const app = express();
const port = 80;

const mongoose = require("mongoose");
var mongoDB = 'mongodb://127.0.0.1/chat';
console.log("mongo: creating DB...");
mongoose.connect('mongodb://127.0.0.1:27017/testaroo',{
    useMongoClient: true,
});

console.log("mongo: DB created");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

Schema = mongoose.Schema;
ChatMessageSchema = new Schema({
  time: Number,
  alias: String,
  message: String
});
ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema );

app.use(express.static('public_html'));

app.get("/:user/:message", function(req, res){

  console.log("message request...");
  var userName = req.params.user;
  console.log(req.params.user);
  var text = req.params.message;
  var date = new Date();
  var currTime = date.getTime();
  console.log("message request: collected params");
  var message = new ChatMessage({
    time: currTime,
    alias: userName,
    message: text});
  message.save(function(err){
    if(err) console.log("error with storing message");
  });
});

//fetchMessage
app.get("/fetch", function(req, res){
  var messages = mongoose.model("ChatMessage", ChatMessageSchema);
  chat = "";
  messages.find({}).exec(function(err, result){
    for (i in result){
      chat+= "<p>"+result[i].alias + ": "+result[i].message+"</p>";
    }
    res.send(chat);
  });

  

});
app.listen(port, function(){
  console.log("listning on : http://$localhost:$port");
});
