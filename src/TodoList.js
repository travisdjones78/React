import { React } from "react";
import TodoListItem from "./TodoListItem";

const todoList = [
    {
        id: '1',
        title: 'Record Music'
    },
    {
        id: '2',
        title: 'Write Code'
    },
    {
        id: '3',
        title: 'Connect Wires'
    }
]

function ToDoList() {
    return (
        <ul>
            {todoList.map(item =>
                <TodoListItem key={item.id} todo={item} />
            )}
        </ul>

    )
}

export default ToDoList;