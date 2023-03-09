import { React, useEffect, useState } from "react";
import ToDoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  const localData = JSON.parse(localStorage.getItem('savedTodoList'))
  const [todoList, setTodoList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: { todoList: (localData.length ? localData : []) } })
      }, 2000);
    })
      .then(result => {
        console.log(result.data.todoList)
        setTodoList(result.data.todoList)
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
    <>
      <h1>ToDo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {(isLoading === true)
        ? <p>Loading....</p>
        : <ToDoList
          todoList={todoList}
          onRemoveTodo={removeTodo}
        />
      }
    </>
  );
}

export default App;
