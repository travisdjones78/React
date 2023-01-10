import { React } from "react";
import ToDoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  return (
    <div>
      <h1>ToDo List</h1>
      {AddTodoForm()}
      {ToDoList()}
    </div>
  );
}

export default App;
