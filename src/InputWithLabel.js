import { useEffect, useRef } from "react"

const InputWithLabel = (props) => {
    const { todoTitle, handeTitleChange, children } = props
    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    return (
        <>
            <label
                htmlFor="todoTitle"
                label={children}
            >
            </label>
            <input
                ref={inputRef}
                id="todoTitle"
                value={todoTitle}
                onChange={handeTitleChange}
            />
        </>
    )
}

export default InputWithLabel