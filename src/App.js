import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

    //todo is current typing, so bottom sets top
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")    // Keep track of current todo we are adding
  
  // top sets bottom here
  const [todoEditing, setTodoEditing] = useState(null)  //grabs id when click innitial edit btn
  const [editingText, setEditingText] = useState('')  // grabs changes from input you type into
  

  useEffect(() => {
    const getTodosFromLocal = localStorage.getItem("todos")
    const parsedTodosFromLocal = JSON.parse(getTodosFromLocal)

    if(parsedTodosFromLocal){
      setTodos(parsedTodosFromLocal)
    }
  },[])

  useEffect(() => {
    const theTodos = JSON.stringify(todos)
    localStorage.setItem("todos", theTodos)
  },[todos]) // everytime todo changes, the function inside useEffect will run



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

function cancelEdit() {
  setTodoEditing(null)
}


  return (
    <div className="App">

        <h2 className="theH2">To-Do List with React <span>Functional Components and Hooks</span></h2>

      <section class="main">

        <form onSubmit={handleSubmit}>
          <input type='text' onChange={(e) => setTodo(e.target.value)} value={todo} />
          <button type='submit'>ADD</button>
        </form>

        {todos.map((item) =>
          <div key={item.id} className='row' >
         
            <div class="posting">

              <input type='checkbox'
                  onChange={() => toggleComplete(item.id) }
                  checked={item.completed}
                />

              {todoEditing === item.id ? (<input type='text'
                onChange={(e) => setEditingText(e.target.value) }
                 value={editingText} placeholder={item.text} /> )
                : (<div className="thePost">{item.text}</div>)}

            </div>
        
            
            <div class="edits">
              
              {todoEditing === item.id ? (
                <>
                  <button class='submitEditsBtn' onClick={() => editTodo(item.id) }>Submit</button>
                  <button onClick={() => cancelEdit()} className='cancelEditing'>Cancel</button>
                  </>
                )
                : (
                 <button className='editBtn' onClick={() => setTodoEditing(item.id)}>Edit</button>
                )
              }
               <i class="fas fa-trash-alt"  onClick={() => deleteTodo(item.id)}></i>
            </div>
        
        
          </div>)}
      </section>
    </div>
  );
}

export default App;
