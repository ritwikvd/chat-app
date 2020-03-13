import React from "react";
import ReactEmoji from "react-emoji";
import "./Message.scss";

const Message = ({ message, name }) => (
	<div className={message.user == name ? "float-left" : "float-right"}>

		<span className="user-name">
			{message.user !== name ? message.user : ""}
		</span>

		<span>{ReactEmoji.emojify(message.message)}</span>

	</div>
);

export default Message;
