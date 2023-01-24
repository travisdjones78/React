import { React, useState } from "react";
import ToDoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  const [newTodo, setNewTodo] = useState('')
  return (
    <div>
      <h1>ToDo List</h1>
      <AddTodoForm onAddTodo={setNewTodo} />
      <p>
        {newTodo}
      </p>
      <ToDoList />
    </div>
  );
}

export default App;
