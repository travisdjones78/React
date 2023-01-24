import { React } from "react";

function AddTodoForm(props) {
    const handleAddTodo = (event) => {
        event.preventDefault()
        const form = event.target
        const todoTitle = event.target.todoTitle.value
        const { onAddTodo } = props
        onAddTodo(todoTitle)
        console.log(todoTitle)
        form.reset()
    }
    return (
        <form onSubmit={handleAddTodo}>
            <label 
            htmlFor="todoTitle" 
            name="title">
            </label>
            <input id="todoTitle"/>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm;