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
    setTodos([...todos].concat(newTodo))
    setTodo('')
  }


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={(e) => setTodo(e.target.value)} value={todo} />
        <button type='submit'>Add</button>
      </form>
      {todos.map((item, i) => <div key={i}>{item.text}</div>)}
    </div>
  );
}

export default App;
