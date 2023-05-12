import { useEffect, useRef } from "react"
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

const InputWithLabel = ({
    todoTitle,
    handeTitleChange,
    children,
    inputRef
}) => {

    useEffect(() => {
        inputRef.current.focus();
    }, []);
    return (
        <>
            <label
                htmlFor="todoTitle"
                label={children}>
            </label>
            <input
                className={style.inputItem}
                ref={inputRef}
                id="todoTitle"
                value={todoTitle}
                onChange={handeTitleChange} />
        </>
    )
}

InputWithLabel.propTypes = {
    handeTitleChange: PropTypes.func,
}

export default InputWithLabel