import { useRef } from "react";
import { React, useState } from "react";
import InputWithLabel from "./InputWithLabel";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

function AddTodoForm({ onAddTodo, start_date, title, rating, status, dead_line, ratingChoice }) {
    const [todoTitle, setTodoTitle] = useState('')
    const inputRef = useRef(null)
    const handeTitleChange = (event) => {
        const newTodoTitle = event.target.value
        setTodoTitle(newTodoTitle)
    }

    const handleAddTodo = (event) => {
        event.preventDefault()
        const newData = {
            fields: {
                DIfficulty: ratingChoice.indexOf(rating.current.value) + 1,
                Startdate: (start_date.current.value === undefined) ? '' : start_date.current.value,
                Status: status.current.value,
                Title: (title.current.value),
                Deadline: (dead_line.current.value === undefined) ? '' : dead_line.current.value
            }
        }
        onAddTodo(newData)
        setTodoTitle('')
    }

    return (
        <form
            className={style.formTag}
            onSubmit={handleAddTodo}>
            <label>Title:</label>
            <InputWithLabel
                todoTitle={todoTitle}
                handeTitleChange={handeTitleChange}
                inputRef={inputRef}>
                Title
            </InputWithLabel>

            <div>
                <label>Rating: </label>
                <label>Very Easy</label>
                <input type='radio' name="rating" value='ve' />
                <label>Easy</label>
                <input type='radio' name="rating" value='e' />
                <label>Average</label>
                <input type='radio' name="rating" value='a' defaultChecked />
                <label>Hard</label>
                <input type='radio' name="rating" value='h' />
                <label>Very Hard</label>
                <input type='radio' name="rating" value='vh' />
            </div>

            <label>Deadline: </label>
            <input type='date' className={style.date} name='deadline' required />

            <div>
                <button
                    type="submit"
                    className={style.button}>
                    Add Todo
                </button>
            </div>

        </form>
    )
}

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func,
}

export default AddTodoForm;