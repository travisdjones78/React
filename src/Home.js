import style from "./components/TodoListItem.module.css";
import AddTodoForm from "./components/AddTodoForm";
import ToDoList from "./components/TodoList";
import TodoBox from "./components/TodoBox";
import Modal from "./Modal/Modal";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { CreateTodo, UpdateTodo, DeleteOneTodo } from "./components/Airtable";

const Home = () => {
    const [todoList, setTodoList] = useState([])
    const [undoneTodo, setUndoneTodo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [show, setShow] = useState(false);
    const [editing, setEditing] = useState(false)
    const [editBtns, setEditBtns] = useState(false)
    const [todoInfo, setTodoInfo] = useState('')
    const [inProgress, setInProgress] = useState('')
    const [currentModal, setCurrentModal] = useState('')
    const [modalTitle, setModalTitle] = useState('')
    const [todoId, setTodoId] = useState('')
    const [todoOrder, setTodoOrder] = useState('asc')
    const [createdOrder, setCreatedOrder] = useState('asc')
    const btnChoice = useRef(null)
    const removeBtn = useRef(null)
    const start_date = useRef('')
    const title = useRef('')
    const status = useRef('')
    const rating = useRef('')
    const dead_line = useRef('')
    const saveBtn = useRef(null)
    const ratingChoice = ['Very Easy', 'Easy', 'Average', 'Hard', 'Very Hard']

    useEffect(() => {
        const undoneList = todoList.filter(item => {
            if (item.fields.Status === 'To do') {
                return item
            }
            return 
        })
        setUndoneTodo(undoneList)
    }, [todoList])

    useEffect(() => {
        const inProgressList = todoList.filter(item => {
            if (item.fields.Status === 'In progress') {
                return item
            }
            return
        })
        setInProgress(inProgressList)
    }, [todoList])

    useEffect(() => {
        fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/todos?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc`, {
            headers: { 'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` }
        })
            .then(result => result.json())
            .then(result => {
                setTodoList(result.records)
                setIsLoading(false)
            })
        setIsLoading(false)
    }, [])

    const titleSorter = () => {
        (todoOrder === 'asc')
            ? todoList.sort((prev, curr) => prev.fields.Title < curr.fields.Title ? -1 : 1)
            : todoList.sort((prev, curr) => prev.fields.Title > curr.fields.Title ? -1 : 1)
        return (todoOrder === 'asc') ? setTodoOrder('') : setTodoOrder('asc')
    }

    const createdSorter = () => {
        (createdOrder === 'asc')
            ? todoList.sort((prev, curr) => prev.createdTime < curr.createdTime ? -1 : 1)
            : todoList.sort((prev, curr) => prev.createdTime > curr.createdTime ? -1 : 1)
        return (createdOrder === 'asc') ? setCreatedOrder('') : setCreatedOrder('asc')
    }

    useEffect(() => {
        if (isLoading === false) {
            localStorage.setItem('savedTodoList', JSON.stringify(todoList))
        }
        console.log(todoList)
    }, [todoList])

    const setCurrentBtn = (event) => {
        event.preventDefault()
        if (event.target.value === 'Create') {
            setCurrentModal('Create')
            setModalTitle('Create A Todo')
        } else {
            setCurrentModal('View')
            setModalTitle(event.target.name)
        }
        setShow(true);
    }
 
    const addTodo = (newTodo) => {
        console.log('nt', newTodo)
        CreateTodo(newTodo)
        setTodoList([...todoList, newTodo])
    }

    const removeTodo = (id) => {
        const newList = todoList.filter(
            item => item.id !== id
        )
        DeleteOneTodo(id)
        setTodoList(newList)
    }

    const grabId = (info) => {
        (info.fields.Startdate === undefined)
            ? info.fields.Startdate = 'No Data'
            : info.fields.Startdate = info.fields.Startdate
        setTodoInfo(info)
    }

    const editSettings = () => {
        (removeBtn.current.hidden === true) ? removeBtn.current.hidden = false : removeBtn.current.hidden = true;
        (saveBtn.current.hidden === true) ? saveBtn.current.hidden = false : saveBtn.current.hidden = true;
        return (editing) ? setEditing(false) : setEditing(true)
    }

    const updateTodo = () => {
        const data = {
            DIfficulty: ratingChoice.indexOf(rating.current.value) + 1,
            Startdate: (start_date.current.value === undefined) ? '' : start_date.current.value,
            Status: status.current.value,
            Title: (title.current.value),
            Deadline: (dead_line.current.value === undefined) ? '' : dead_line.current.value
        }
        UpdateTodo({ data, todoId })
    }

    return (
        <div>
            <main>
                <div className={style.topBar}>
                    <h1>ToDo List</h1>
                </div>

                <section>
                    <div className={style.leftDiv}>
                        <h2> Todo Items</h2>
                        {(undoneTodo.length > 0)
                            ? <ToDoList
                                className={style.todoList}
                                todoList={undoneTodo}
                                onRemoveTodo={removeTodo}
                                setShow={setShow}
                                grabId={grabId}
                                outside={true} />
                            : 'You dont have any undone items!'}
                    </div>

                    <div className={style.middleDiv}>
                        <h2>All Todo Items</h2>
                        <button
                            ref={btnChoice}
                            value='Create'
                            onClick={setCurrentBtn}>
                            Create Todo
                        </button>
                        <button onClick={titleSorter}>Sort By Title {(todoOrder === 'asc') ? 'Down' : 'Up'}</button>
                        <button onClick={createdSorter}>Sort by Created Date {(createdOrder === 'asc') ? 'Down' : 'Up'}</button>
                        {(isLoading === true)
                            ? <h1>Loading....</h1>
                            : <ToDoList
                                todoList={todoList}
                                onRemoveTodo={removeTodo}
                                setShow={setShow}
                                grabId={grabId}
                                btnChoice={btnChoice}
                                setCurrentBtn={setCurrentBtn}
                                outside={false} />}
                    </div>

                    <div className={style.rightDiv}>
                        <h2>In-Progress Items</h2>
                        {(inProgress.length > 0)
                            ? <ToDoList
                                className={style.todoList}
                                todoList={inProgress}
                                onRemoveTodo={removeTodo}
                                setShow={setShow}
                                grabId={grabId}
                                outside={true} />
                            : 'You dont have any items in progress!'}
                    </div>
                </section>
            </main>

            <Modal
                title={modalTitle}
                onClose={() => setShow(false)}
                show={show}
                editing={editing}>
                {(currentModal === 'Create')
                    ? <AddTodoForm onAddTodo={addTodo} />
                    : <TodoBox
                        todoInfo={todoInfo}
                        className={style.todoBox}
                        outside={false}
                        ratingChoice={ratingChoice}
                        editing={editing}
                        editBtns={editBtns}
                        removeBtn={removeBtn}
                        saveBtn={saveBtn}
                        start_date={start_date}
                        title={title}
                        rating={rating}
                        status={status}
                        dead_line={dead_line}
                        removeTodo={removeTodo}
                        editSettings={editSettings}
                        setEditBtns={setEditBtns}
                        updateTodo={updateTodo}
                        setTodoId={setTodoId} />}
            </Modal>
        </div>
    )
}

export default Home


