const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const { room_map, addUser, removeUser } = require("./users");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
	cors: {
		origin: "https://chat-app-client-ritwikvd.vercel.app",
		credentials: true
	}
});

//Configure path to env variables
dotenv.config({ path: "./config/config.env" });

//Initialize middleware
// app.use(cors({ origin: "https://chat-apps-client-ritwikvd.vercel.app" }));
app.use(express.json());
//

//Use React build
// app.use(express.static("./client/build"));
// app.get("*", (req, res) => res.sendFile(path.resolve("./client/build/index.html")));

const PORT = process.env.PORT || 8080;

server.listen(PORT, console.log(`yoohoo from ${process.env.NODE_ENV} on port: ${PORT}`));

//Socket emitters and handlers
io.on("connection", handleConnection);

function handleConnection(socket) {
	console.log(`Socket connected`);

	//join event handler
	socket.on("join", ({ name, room }) => {
		//Emit message event as a welcome
		socket.emit("message", {
			message: `${name}! have fun in the ${room} chat room`,
			user: "admin"
		});

		//Add the connection to the room
		socket.join(room);

		!addUser({ id: socket.id, name, room });

		console.log(room_map);

		//message broadcast to the rest of the room
		socket.broadcast.to(room).emit("message", {
			message: `${name} joined the room!`,
			user: "admin"
		});
		//

		io.to(room).emit("roomData", { users: room_map.get(room) });
	});

	//checkUser event handler
	socket.on("checkUser", ({ name, room }, callback) => {
		if (!room_map.get(room)) return callback(false);

		if (room_map.get(room).find(item => item.name == name)) return callback(true);

		return callback(false);
	});
	//

	//message event handler
	socket.on("sendMessage", ({ message, room, name }, callBack) => {
		io.to(room).emit("message", {
			message,
			user: name
		});

		callBack();
	});
	//

	//typing event handler
	socket.on("typing", ({ typing, room, name }) =>
		typing
			? socket.broadcast.to(room).emit("isTyping", { name })
			: socket.broadcast.to(room).emit("notTyping", { name })
	);

	//disconnect event handler
	socket.on("remove", ({ name, room }) => {
		console.log(`Socket disconnected`);

		removeUser({ name, room });

		socket.broadcast.to(room).emit("notTyping", { name });

		socket.broadcast.to(room).emit("message", {
			message: `${name} has left the room`,
			user: "admin"
		});

		io.to(room).emit("roomData", { users: room_map.get(room) });
	});
}
//
