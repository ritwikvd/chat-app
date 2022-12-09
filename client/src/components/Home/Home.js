import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Home.scss";
import { Link, Redirect } from "react-router-dom";

let socket;

const Home = props => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [nameError, setNameError] = useState(false);
	const [roomError, setRoomError] = useState(false);
	const [btnError, setBtnError] = useState(false);
	const [btnShake, setBtnShake] = useState(false);
	const [errMsg, setErrMsg] = useState("");
	const [error, setError] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [fade, setFade] = useState(false);

	useEffect(() => {
		document.querySelector("title").textContent = "Welcome!";

		if (props && props.location.error) {
			setErrMsg(props.location.error);
			setError(true);
			setTimeout(() => setError(false), 5000);
		}

		socket = io(process.env.REACT_APP_SOCKET_ENDPOINT, {
			cors: {
				origin: false
			}
		});

		setFade(true);
	}, []);

	useEffect(() => {
		if (!nameError && !roomError) setBtnError(false);
	}, [nameError, roomError]);

	const handleValidation = e => {
		e.preventDefault();

		if (nameError || roomError) {
			setBtnError(true);
			setBtnShake(true);
			setTimeout(() => setBtnShake(false), 550);
		}

		name || setNameError(true);
		room || setRoomError(true);

		if (name && room) {
			socket.emit("checkUser", { name, room }, bool => {
				if (bool) {
					setErrMsg(`"${name}" has already been taken in the chat room "${room}"`);
					setError(true);
					setTimeout(() => setError(false), 5000);
				} else setSubmit(true);
			});
		}
	};

	if (submit)
		return (
			<Redirect
				to={{
					pathname: `/chat`,
					search: `?name=${name}&room=${room}`,
					state: { token: true }
				}}
			/>
		);

	return (
		<>
			<div className={fade ? "home-class fade overlay" : "home-class overlay"}>
				<div className="banner">
					<h2>Welcome to yet another Chat App!</h2>

					<p>Enter a name and a chat room to start chatting...!</p>
				</div>

				<div className="form-class">
					<form>
						<p className={error ? "fade-in" : "fade-out"}>{errMsg}</p>

						<Input
							{...{
								focus: true,
								setState: setName,
								error: nameError,
								setError: setNameError,
								messages: ["You need a name first!", "Enter a name to chat with"]
							}}
						/>

						<Input
							{...{
								focus: false,
								setState: setRoom,
								error: roomError,
								setError: setRoomError,
								messages: ["We don't know which room you want to chat in!", "Which room would you like to join?"]
							}}
						/>

						<Link
							onClick={handleValidation}
							to={{
								pathname: `/chat`,
								search: `?name=${name}&room=${room}`,
								state: { token: true }
							}}>
							<button type="submit" className={btnShake ? "shake" : ""}>
								{btnError ? "Sorry, can't let you thru!" : "Start Chatting"}
							</button>
						</Link>
					</form>
				</div>
			</div>
		</>
	);
};

const Input = ({ focus, setState, error, setError, messages }) => {
	return (
		<input
			type="text"
			placeholder={error ? messages[0] : messages[1]}
			className={error ? "shake" : ""}
			onFocus={() => (error ? setError(false) : null)}
			onChange={e => setState(e.target.value)}
			autoFocus={focus ? true : false}
		/>
	);
};

export default Home;
