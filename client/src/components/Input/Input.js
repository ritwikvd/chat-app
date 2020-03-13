import React, { useEffect } from "react";

function Input({ message, setMessage, sendMessage, setPersonTyping }) {

	return (
		<form onSubmit={e => {
			sendMessage(e);
			setPersonTyping(false);
		}}>
			<input
				type="text"
				placeholder="You know how this works!"
				value={message}
				onChange={e => {
					setMessage(e.target.value);
					setPersonTyping(true);
				}}
				autoFocus
			/>
			<button type="submit">Send</button>
		</form>
	);
}

export default Input;
