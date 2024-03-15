import React, { useState, useEffect  } from "react";


//create your first component
const Home = () => {
	//declaración de estados
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
	//declaración de funciones
	
	function crearUsuario() { 
		fetch('https://playground.4geeks.com/apis/fake/todos/user/pmorales',{
			method: "POST", 
			headers: { 
				"Content-Type":"application/json"
			},
			body: JSON.stringify([]) 
			})
			.then((respuesta) => respuesta.json())
			.then((data) => console.log(data))
			.catch(error => console.log(error))
	}

	function verTareas() {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/pmorales', {
			method: "GET"
		})
			.then((respuesta) => respuesta.json())
			.then((data) => setTodos(data))
			.catch(error => console.log(error))
	}
 	function actualizarLista() {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/pmorales',{
			method: "PUT",
			headers: {	
				"Content-Type":"application/json"
		},
		body: JSON.stringify(todos)
		})
		.then((respuesta) => respuesta.json())
		.then((data) => setTodos(data))
		.catch(error => console.log(error))
	}
	useEffect(()=>{
		crearUsuario()
		verTareas()
	}, []) 
console.log(todos);
	return (
		<div className="container">
			<h1>My Todos</h1>
			<ul>
				<li>
					<input 
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) => {
							if (e.key == "Enter") {
								setTodos(todos.concat({ label: inputValue, done: false }));
								setInputValue("");
								actualizarLista();
							}
						}}
						placeholder="What do you need to do?" />
				</li>
				{todos.map((item) => (
					<li>
						{item.label} {" "}
						<i
						 className="fas fa-times"
						 onClick={() => 
							setTodos(
								todos.filter(
									(t, currentIndex) => 
										index != currentIndex))}></i>
					</li>))}
			</ul>
			<div>{todos.length} Tasks</div>
		</div>
	);
};

export default Home;
