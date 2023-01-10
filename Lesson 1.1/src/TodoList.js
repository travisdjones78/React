import { React } from "react";
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
            {todoList.map(item => {
                return <li key={item.id}>
                    <span>{item.title}</span>
                </li>
            })}
        </ul>

    )
}

export default ToDoList;