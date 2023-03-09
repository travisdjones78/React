import { React, useEffect, useState } from "react";
import ToDoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const useSemiPersistentState = () => {
  const localData = JSON.parse(localStorage.getItem('savedTodoList'))
  const [todoList, setTodoList] = useState((localData.length ? localData : []))

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList))
  }, [todoList])
  return [todoList, setTodoList]
}

function App() {
  const [todoList, setTodoList] = useSemiPersistentState()
  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo])
  }
  
  return (
    <>
      <h1>ToDo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <ToDoList todoList={todoList} />
    </>
  );
}

export default App;
