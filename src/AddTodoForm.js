
import { React,useState } from "react";
import InputWithLabel from "./InputWithLabel";


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

        setTodoTitle('')
    }
    return (
        <form onSubmit={handleAddTodo}>

            <InputWithLabel
                todoTitle={todoTitle}
                handeTitleChange={handeTitleChange}
            >
                Title
            </InputWithLabel>

            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm;