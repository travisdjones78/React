import { React } from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

const ToDoList = ({
    todoList,
    onRemoveTodo,
    setShow,
    grabId,
    setCurrentBtn,
    outside
}) => {
    return (
        <>
            {todoList.map(item =>
                <TodoListItem
                    key={item.id}
                    todo={item}
                    onRemoveTodo={onRemoveTodo}
                    setShow={setShow}
                    grabId={grabId}
                    setCurrentBtn={setCurrentBtn}
                    outside={outside} />)}
        </>
    )
}
ToDoList.propTypes = {
    onRemoveTodo: PropTypes.func,
    setShow: PropTypes.func,
    setCurrentBtn: PropTypes.func,
    grabId: PropTypes.func,
}
export default ToDoList;