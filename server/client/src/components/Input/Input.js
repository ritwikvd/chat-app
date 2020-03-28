import React, { useLayoutEffect } from "react";

function Input({ message, setMessage, sendMessage, setPersonTyping }) {

	const inputRef = React.createRef();

	useLayoutEffect(() => inputRef.current.focus());

	const submit = e => {
		e.preventDefault();

		if (!e.target.input.value || !e.target.input.value.trim()) return;

		sendMessage(e);
		setPersonTyping(false);
	}

	return (
		<form onSubmit={submit}>
			<input
				name="input"
				ref={inputRef}
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
