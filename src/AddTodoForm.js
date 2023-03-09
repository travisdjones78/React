
import { useState } from "react";
import { React } from "react";

function AddTodoForm(props) {
    const { onAddTodo } = props
    const [todoTitle, setTodoTitle] = useState('')
    const handeTitleChange = (event) => {
        const newTodoTitle = event.target.value
        setTodoTitle(newTodoTitle)
    }
    const handleAddTodo = (event) => {
        event.preventDefault()
        onAddTodo({
            title: todoTitle,
            id: Date.now()
        })
        console.log(todoTitle)
        setTodoTitle('')
    }
    return (
        <form onSubmit={handleAddTodo}>
            <label
                htmlFor="todoTitle"
                name="title">
            </label>
            <input
                id="todoTitle"
                value={todoTitle}
                onChange={handeTitleChange}
            />
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm;