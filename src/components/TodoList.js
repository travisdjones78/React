import { React } from "react";
import TodoListItem from "./TodoListItem";

function ToDoList({
    todoList,
    onRemoveTodo,
    setShow,
    currItem,
    grabId,
    setCurrentBtn,
    outside
}) {
    return (
        <>
            {todoList.map(item =>
                <TodoListItem
                    key={item.id}
                    todo={item}
                    onRemoveTodo={onRemoveTodo}
                    setShow={setShow}
                    currItem={currItem}
                    grabId={grabId}
                    setCurrentBtn={setCurrentBtn}
                    outside={outside} />)}
        </>
    )
}

export default ToDoList;