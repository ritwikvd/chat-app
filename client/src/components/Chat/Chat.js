import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { Link, Redirect } from "react-router-dom";
import io from "socket.io-client";
import ChatBox from "../ChatBox/ChatBox.js";
import Input from "../Input/Input.js";

import "./Chat.scss";

let socket = null;

const Chat = ({ location: { search, state } }) => {

	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [users, setUsers] = useState([]);
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	const [typing, setTyping] = useState([]);
	const [fade, setFade] = useState(false);

	const ENDPOINT = "http://localhost:8000/";

	useEffect(() => {

		setFade(true);

		const { name, room } = queryString.parse(search);

		//Document title
		document.querySelector("title").textContent = `Have fun chatting in ${room}!`;

		setName(name);
		setRoom(room);

		socket = io(ENDPOINT);

		//message event handler
		socket.on("message", message => setMessages(prev => [...prev, message]));

		//roomData event handler
		socket.on("roomData", ({ users }) => setUsers([...users.filter(user => user.name !== name)]));

		//typing event handlers
		socket.on("isTyping", ({ name }) => setTyping(prev => prev.includes(name) ? prev : [...prev, name]));

		socket.on("notTyping", ({ name }) => setTyping(prev => {
			const arr = [...prev];
			const index = arr.indexOf(name);
			arr.splice(index, 1);
			return arr;
		}));
		//

		//Join room
		socket.emit("join", { name, room });

		//Disconnect on unmount
		return () => {
			socket.emit("remove", { name, room });
			socket.disconnect();
		};
		//

	}, []);

	const sendMessage = e => {
		e.preventDefault();
		message && socket.emit("sendMessage", { message, room, name }, () => setMessage(""));
	};

	const setPersonTyping = typing => socket.emit("typing", { typing, room, name });

	if (!state || !state.token) return <Redirect to={{
		pathname: "/",
		error: "Hey! no cheating : |"
	}} />;

	return (
		<div className={fade ? "chat-class fade" : "chat-class"}>
			<div className="room-info">

				<h2>You're now chatting in {room}!</h2>

				{users.length == 0 ? <Lonesome /> : <Mingling {...{ users: users.map(user => user.name) }} />}

				<Link to={`/`}>

					<button>Need to go?</button>

				</Link>

			</div>

			<div className="chat-box-container">

				<div className="chat-box">

					<ChatBox {...{ messages, name }} />

					{typing.length ?
						<div className="typing-container">
							<div className="dots"></div>
							<div className="dots"></div>
							<div className="dots"></div>
							{typing.length < 3 ? <p>{typing.join(", ")} {typing.length > 1 ? " are typing..." : " is typing..."}</p> :
								<p>Several people are typing...</p>}
						</div> : null}

					<Input {...{ message, setMessage, sendMessage, setPersonTyping }} />

				</div>

			</div>
		</div>
	);
}

const Lonesome = () => <p>Looks like you're the only one being unproductive :/</p>;

const Mingling = ({ users }) =>
	(
		<>
			<p>
				You're wasting time with{" "}
				{users.length == 1 ? "this slacker" : "these slackers"}...
			</p>

			<ul>
				{users.map((user, index) => <li key={index}>{user}</li>)}
			</ul>
		</>
	);

export default Chat;
