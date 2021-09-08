import React, { useState } from 'react';
import './App.css';

function App() {

    //todo is current typing, so bottom sets top
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")    // Keep track of current todo we are adding
  
  // top sets bottom here
  const [todoEditing, setTodoEditing] = useState(null)
  const [editingText, setEditingText] = useState('')
  



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




  function deleteTodo(id) {
     console.log(id)             
      
   const updatedTodos = todos.filter((item) => item.id !== id)
    setTodos(updatedTodos)
  }



  function toggleComplete(id) {

      const updatedTodos = [...todos].map((item) => {
        if(item.id === id) {
          item.completed = !item.completed  
        }
        return item;
      })

      setTodos(updatedTodos)

  }




function editTodo(id) {
  const updatedTodos = [...todos].map((item) => {
    if(item.id === id){
      item.text = editingText  
    }
    return item;   // with () => {} we need to use the return keyword, () => single line no {} self returns
    
  })
  setTodos(updatedTodos)
  setTodoEditing(null)
  setEditingText('')
  
}


  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <input type='text' onChange={(e) => setTodo(e.target.value)} value={todo} />
        <button type='submit'>Add</button>
      </form>

      {todos.map((item) => 
        <div key={item.id} >     
          
         
          {todoEditing === item.id ? (<input type='text' 
            onChange={(e) => setEditingText(e.target.value) } 
             value={editingText} /> )
            : (<div>{item.text}</div>)}
          
          <button onClick={() => deleteTodo(item.id)}>Delete</button>

          <input type='checkbox' 
            onChange={() => toggleComplete(item.id) } 
            checked={item.completed} 
          />


          {todoEditing === item.id ? (<button onClick={() => editTodo(item.id) }>Submit Edits</button>)
          : (<button onClick={() => setTodoEditing(item.id)}>Edit</button>)
        }
          
          

        </div>)}
    </div>
  );
}

export default App;
