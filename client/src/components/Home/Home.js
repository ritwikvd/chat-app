import React, { useState, useEffect } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";

const Home = props => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [nameError, setNameError] = useState(false);
	const [roomError, setRoomError] = useState(false);
	const [btnError, setBtnError] = useState(false);
	const [duplicate, setDuplicate] = useState("");
	const btnRef = React.createRef();

	useEffect(() => {
		document.querySelector("title").textContent = "Home";
		props && props.location.error && setDuplicate(props.location.error);
	}, []);

	useEffect(() => {
		if (!nameError && !roomError) setBtnError(false);
	}, [nameError, roomError]);

	const handleValidation = e => {
		if (nameError && roomError && btnError) {
			btnRef.current.classList.add("shake");
			setTimeout(() => {
				if (btnRef.current) btnRef.current.classList.remove("shake")
			}, 1000);
		}

		(nameError || roomError) && setBtnError(true);

		name || setNameError(true);
		room || setRoomError(true);

		(!name || !room) && e.preventDefault();
	};

	return (
		<>
			<div className="home-class">
				<div className="banner">
					<h2>Welcome to yet another Chat App!</h2>

					<p>Enter a name and a chat room to start wasting your time...!</p>
				</div>

				<div className="form-class">
					<form>
						<p>{duplicate}</p>

						<Input {...{ focus: true, setState: setName, error: nameError, setError: setNameError, messages: ["You need a name first!", "Enter a name to chat with"] }} />

						<Input {...{
							focus: false, setState: setRoom, error: roomError, setError: setRoomError,
							messages: ["We don't know which room you want to chat in!", "Which room would you like to join?"]
						}} />

						<Link onClick={handleValidation} to={`/chat?name=${name}&room=${room}`}>
							<button type="submit" ref={btnRef}>
								{btnError ? "Sorry, can't let you thru!" : "Start Chatting"}
							</button>
						</Link>

					</form>

				</div>

			</div >

		</>
	);
};

const Input = ({ focus, setState, error, setError, messages }) => {

	return (
		<input
			type="text"
			placeholder={error ? messages[0] : messages[1]}
			className={error ? "shake" : ""}
			onFocus={() => error ? setError(false) : null}
			onChange={e => setState(e.target.value)}
			autoFocus={focus ? true : false}
		/>
	);
};

export default Home;
