import React, { useState, useEffect } from "react";


//create your first component
const Home = () => {
	//declaración de estados
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
	//declaración de funciones

	function agregarTareas(e) {
		if (e.key == "Enter") {
			let aux = todos.concat({ label: inputValue, done: false })
			setTodos(todos.concat({ label: inputValue, done: false }));
			setInputValue("");
			actualizarLista(aux);
		}
		//agregamos la tarea al array todos
		actualizarTareas() //enviamos el nuevo array al servidor
		
	}
	function borrarTarea(index) {
		let aux = todos.filter(
			(t, currentIndex) =>
				index != currentIndex)
		setTodos(aux)
		//eliminamos la tarea del array todos
		actualizarLista(aux) //volvemos a revisar el array de tareas sin la borrada
	}
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
	function actualizarLista(listatodos) {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/pmorales',{
			method: "PUT",
			headers: {	
				"Content-Type":"application/json"
		},
		body: JSON.stringify(listatodos)
		})
		.then((respuesta) => {
			if (respuesta.status == 200) {
			verTareas()	
			};
			return respuesta.json()})
		// .then((data) => setTodos(data))
		.then((data) => console.log(data))
		.catch(error => console.log(error))
	}
	function borrarTodo() {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/pmorales', {
			method: "DELETE"
		})
		.then((respuesta) => {
			if (respuesta.status == 201) {
			setTodos([])	
			};
			return respuesta.json()})
			.then((data) => console.log(data))
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
						onKeyDown={agregarTareas}
						placeholder="What do you need to do?" />
				</li>
				{todos.map((item, index) => (
					<li>
						{item.label} {" "}
						<i
							className="fas fa-times"
							onClick={() => borrarTarea(index)}></i>
					</li>))}
			</ul>
			<div>{todos.length} Tasks</div>
			<button type="button" class="btn btn-danger" onClick={borrarTodo}>Borra todo</button>
		</div>
		
	);
};

export default Home;
