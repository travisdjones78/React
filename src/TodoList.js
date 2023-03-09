import { React } from "react";
import TodoListItem from "./TodoListItem";

function ToDoList(props) {
    const { todoList, onRemoveTodo } = props
    return (
        <ul>
            {todoList.map(item =>
                <TodoListItem 
                key={item.id} 
                todo={item} 
                onRemoveTodo={onRemoveTodo}
                />

            )}
        </ul>
    )
}

export default ToDoList;