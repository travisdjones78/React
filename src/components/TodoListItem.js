import React from "react";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

const TodoListItem = ({
    todo,
    setShow,
    grabId,
    btnChoice,
    setCurrentBtn,
    outside
}) => {
    return (
        <div className={style.item} onClick={setCurrentBtn}>
            <span
                className={style.itemTitle}
                name={todo.fields.Title}>
                {todo.fields.Title}
            </span>
               <p><small> (Created on {todo.createdTime.split('T')[0]})</small></p> 
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

TodoListItem.propTypes = {
    setShow: PropTypes.func,
    grabId: PropTypes.func,
    setCurrentBtn: PropTypes.func,
}

export default TodoListItem