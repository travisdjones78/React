import { React } from "react";
import TodoListItem from "./TodoListItem";

function ToDoList(props) {
    const { todoList } = props
    return (
        <ul>
            {todoList.map(item =>
                <TodoListItem key={item.id} todo={item} />
            )}
        </ul>
    )
}

export default ToDoList;