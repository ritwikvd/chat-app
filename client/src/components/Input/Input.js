import React, { useEffect } from "react";

function Input({ message, setMessage, sendMessage, setPersonTyping }) {

	const ref = React.createRef();

	useEffect(() => {
		ref.current.focus();
	}, [])

	return (
		<form onSubmit={e => {
			sendMessage(e);
			setPersonTyping(false);
		}}>
			<input
				ref={ref}
				type="text"
				placeholder="You know how this works!"
				value={message}
				onChange={e => {
					setMessage(e.target.value);
					setPersonTyping(true);
				}}
			/>
			<button type="submit">Send</button>
		</form>
	);
}

export default Input;
