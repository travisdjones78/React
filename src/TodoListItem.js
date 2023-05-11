import React from "react";
import style from "./TodoListItem.module.css";

const TodoListItem = (props) => {
    const {
        todo,
        setShow,
        grabId,
        btnChoice,
        setCurrentBtn,
        outside
    } = props
    return (
        <div className={style.item} onClick={setCurrentBtn}>
            <span
                className={style.itemTitle}
                name={todo.fields.Title}>
                {todo.fields.Title}
            </span>
            <button
                onClick={() => {
                    setShow(true)
                    grabId(todo)
                }}
                className={(outside) ? style.outsideButton : style.insideButton}
                ref={btnChoice}
                value='View'
                name={todo.fields.Title} >
                View Item
            </button>

        </div>
    )
}

export default TodoListItem