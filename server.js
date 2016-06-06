var express = require("express");

var app = express();

app.use(express.static("./public"));
app.use(express.static("./bower_components"));

var server = app.listen(process.env.PORT || 3000);

var io = require("socket.io").listen(server);

app.all("*", function(req, res, next){
	if(req.originalUrl.indexOf("/api/") != -1)
		res.send("No api.");
	else if(req.originalUrl.indexOf("/public/") != -1)
		next();
	else
		res.sendFile(__dirname + "/public/index.html");
});

io.sockets.on("connection", function(socket){

	socket.on("ANSWER_GIVEN", function(data){
		console.log(data);
		data.actionType = "UPDATE_ANSWERS";
		socket.broadcast.emit("server", data);
	});

	socket.on("QUESTION_CREATED", function(data){
		data.actionType = "FETCH_QUESTION";
		socket.broadcast.emit("server", data);
	});

	socket.on("QUESTION_REMOVED", function(data){
		data.actionType = "UPDATE_QUESTIONS";
		socket.broadcast.emit("server", data);
	});

});

console.log("Server is started");