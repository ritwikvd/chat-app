import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message";

const ChatBox = ({ messages, name }) => (
	<ScrollToBottom>

		{messages.map(message => <Message {...{ message, name }} />)}

	</ScrollToBottom>
);

export default ChatBox;
