import { React, useState } from "react";
import ToDoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  const [todoList, setTodoList] = useState([])
  const addTodo = (newTodo)=>{
    setTodoList([...todoList,newTodo])
  }
  // const [newTodo, setNewTodo] = useState('')
  return (
    <div>
      <h1>ToDo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <p>
        {/* {newTodo} */}
      </p>
      <ToDoList todoList={todoList}/>
    </div>
  );
}

export default App;
