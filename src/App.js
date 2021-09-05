import React, { useState } from 'react';
import './App.css';

function App() {

  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")    // Keep track of current todo we are adding


  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    }
    console.log(todos)
    setTodos([...todos, newTodo])
    setTodo('')
  }


// 18:00
  function deleteTodo(id) {
     console.log(id)             
       // return only the values where the item.id is !== not equal to id. if false value it will not return that element in the array
   const updatedTodos = todos.filter((item) => 
   
      item.id !== id
   
    )
    setTodos(updatedTodos)
  }


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={(e) => setTodo(e.target.value)} value={todo} />
        <button type='submit'>Add</button>
      </form>
      {todos.map((item) => <div key={item.id} >
        <div>{item.text}</div>
        <button onClick={() => deleteTodo(item.id)}>Delete</button>
        </div>)}
    </div>
  );
}

export default App;
