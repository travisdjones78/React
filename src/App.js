import { React, useEffect, useState } from "react";
import ToDoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
      }
    })
      .then(result => result.json())
      .then(result => {
        setTodoList(result.records)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    if (isLoading === false) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList))
    }
  }, [todoList])

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo])
  }

  const removeTodo = (id) => {
    const newList = todoList.filter(
      item => item.id !== id
    )
    setTodoList(newList)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={
          <>
            <h1>ToDo List</h1>
            <AddTodoForm onAddTodo={addTodo} />
            {
              (isLoading === true)
                ? <p>Loading....</p>
                : <ToDoList
                  todoList={todoList}
                  onRemoveTodo={removeTodo}
                />
            }
          </>
        }
        />

        <Route exact path="/new" element={
          <h1>New Todo List</h1>
        } />
      </Routes>
    </BrowserRouter>
  );
}


export default App;



