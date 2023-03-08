import { React } from "react";
import TodoListItem from "./TodoListItem";


    return (
        <ul>
            {todoList.map(item =>
                <TodoListItem key={item.id} todo={item} />
            )}
        </ul>
    )
}

export default ToDoList;