[1mdiff --git a/client/src/components/Home/Home.js b/client/src/components/Home/Home.js[m
[1mindex af722e2..c1948e1 100644[m
[1m--- a/client/src/components/Home/Home.js[m
[1m+++ b/client/src/components/Home/Home.js[m
[36m@@ -23,7 +23,9 @@[m [mconst Home = props => {[m
 	const handleValidation = e => {[m
 		if (nameError && roomError && btnError) {[m
 			btnRef.current.classList.add("shake");[m
[31m-			setTimeout(() => btnRef.current.classList.remove("shake"), 1000);[m
[32m+[m			[32msetTimeout(() => {[m
[32m+[m				[32mif (btnRef.current) btnRef.current.classList.remove("shake")[m
[32m+[m			[32m}, 1000);[m
 		}[m
 [m
 		(nameError || roomError) && setBtnError(true);[m
[36m@@ -50,7 +52,7 @@[m [mconst Home = props => {[m
 						<Input {...{ focus: true, setState: setName, error: nameError, setError: setNameError, messages: ["You need a name first!", "Enter a name to chat with"] }} />[m
 [m
 						<Input {...{[m
[31m-							focuse: false, setState: setRoom, error: roomError, setError: setRoomError,[m
[32m+[m							[32mfocus: false, setState: setRoom, error: roomError, setError: setRoomError,[m
 							messages: ["We don't know which room you want to chat in!", "Which room would you like to join?"][m
 						}} />[m
 [m
[36m@@ -71,21 +73,15 @@[m [mconst Home = props => {[m
 };[m
 [m
 const Input = ({ focus, setState, error, setError, messages }) => {[m
[31m-	const ref = React.createRef();[m
[31m-[m
[31m-	useEffect(() => {[m
[31m-		if (focus) ref.current.focus();[m
[31m-	}, []);[m
[31m-[m
 [m
 	return ([m
 		<input[m
[31m-			ref={ref}[m
 			type="text"[m
 			placeholder={error ? messages[0] : messages[1]}[m
 			className={error ? "shake" : ""}[m
 			onFocus={() => error ? setError(false) : null}[m
 			onChange={e => setState(e.target.value)}[m
[32m+[m			[32mautoFocus={focus ? true : false}[m
 		/>[m
 	);[m
 };[m
[1mdiff --git a/client/src/components/Input/Input.js b/client/src/components/Input/Input.js[m
[1mindex a293bd6..54c474a 100644[m
[1m--- a/client/src/components/Input/Input.js[m
[1m+++ b/client/src/components/Input/Input.js[m
[36m@@ -2,19 +2,12 @@[m [mimport React, { useEffect } from "react";[m
 [m
 function Input({ message, setMessage, sendMessage, setPersonTyping }) {[m
 [m
[31m-	const ref = React.createRef();[m
[31m-[m
[31m-	useEffect(() => {[m
[31m-		ref.current.focus();[m
[31m-	}, [])[m
[31m-[m
 	return ([m
 		<form onSubmit={e => {[m
 			sendMessage(e);[m
 			setPersonTyping(false);[m
 		}}>[m
 			<input[m
[31m-				ref={ref}[m
 				type="text"[m
 				placeholder="You know how this works!"[m
 				value={message}[m
[36m@@ -22,6 +15,7 @@[m [mfunction Input({ message, setMessage, sendMessage, setPersonTyping }) {[m
 					setMessage(e.target.value);[m
 					setPersonTyping(true);[m
 				}}[m
[32m+[m				[32mautoFocus[m
 			/>[m
 			<button type="submit">Send</button>[m
 		</form>[m
