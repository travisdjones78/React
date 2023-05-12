import style from "./TodoListItem.module.css";
import Rating from "./Rating";
import Interval from "./Interval";
import { useState } from "react";
import PropTypes from "prop-types";

const TodoBox = ({
    todoInfo,
    removeTodo,
    outside,
    ratingChoice,
    editSettings,
    editing,
    editBtns,
    setEditBtns,
    removeBtn,
    saveBtn,
    updateTodo,
    start_date,
    dead_line,
    title,
    status,
    rating,
    setTodoId
}) => {
    const [showDate, setShowDate] = useState(false)

    const formatDate = (currDate) => {
        const formatData = new Date(currDate)
        return `${formatData.getMonth()}-${formatData.getDate()}-${formatData.getFullYear()} `
    }

    const currentStatus = (curr) => {
        const status = ['To do', 'In progress', 'Done'];
        const filteredStatus = status.filter(item => item !== curr);
        return [curr, ...filteredStatus]
    }

    const currentRating = (rate) => {
        let rating = ''
        const filterRatings = ratingChoice.filter((choice, idx) => idx + 1 !== rate)
        switch (rate) {
            case 1:
                rating = ratingChoice[0]
                break;
            case 2:
                rating = ratingChoice[1]
                break;
            case 3:
                rating = ratingChoice[2]
                break;
            case 4:
                rating = ratingChoice[3]
                break;
            case 5:
                rating = ratingChoice[3]
                break;
            default:
                break;
        }
        return [rating, ...filterRatings]
    }
    
    const setStartdate = (event) => {
        event.preventDefault()
        return (event.target.value === 'y') ? setShowDate(true) : setShowDate(false)
    }

    const setBtns = () => {
        return (!editBtns) ? setEditBtns(true) : setEditBtns(false)
    }
    return (
        <>
            {(todoInfo !== '')
                ? <div>
                    {(editing)
                        ? <div className={style.itemInfo}>
                            Edit Title: <input
                                type='text'
                                className={style.inputItem}
                                defaultValue={todoInfo.fields.Title}
                                name='title'
                                ref={title} />
                        </div>
                        : ''}
                    <small>Created on : {formatDate(todoInfo.createdTime)}</small>
                    <div className={style.itemInfo}>
                        Start Date:  {(todoInfo.fields.Startdate === 'No Data')
                            ? 'You have not set a start date'
                            : (formatDate(todoInfo.fields.Startdate))}
                        {(editing && todoInfo.fields.Startdate === 'No Data')
                            ? <div>
                                <form onChange={setStartdate}>
                                    Want to Set One?
                                    <label>Yes</label>
                                    <input
                                        type='radio'
                                        name="set"
                                        value='y' />
                                    <label>No</label>
                                    <input
                                        type='radio'
                                        name="set"
                                        value='n'
                                        defaultChecked />
                                </form>
                                {(showDate)
                                    ? <input
                                        type='date'
                                        className={style.date}
                                        min={new Date().toISOString().split('T')[0]}
                                        name='start_date'
                                        ref={start_date}
                                        defaultValue='No date' />
                                    : ''}
                            </div>
                            : ''}
                    </div>

                    <div className={style.itemInfo} >
                        Current Status: {(todoInfo.fields.Status === 'To do')
                            ? <span className={style.statusTodo}>To do</span>
                            : (todoInfo.fields.Status === 'In progress')
                                ? <span className={style.statusInProgress}>In progress</span>
                                : <span className={style.statusDone}>Done</span>}
                    </div>

                    {(editing)
                        ? <select
                            name='status'
                            ref={status}>
                            {currentStatus(todoInfo.fields.Status).map((stat, idx) => {
                                return <option key={idx}>{stat}</option>
                            })}
                        </select>
                        : ''}

                    <div className={style.itemInfo}>
                        Rating: <Rating
                            rating={todoInfo.fields.DIfficulty}
                            ratingChoice={ratingChoice} />
                    </div>

                    {(editing)
                        ? <select
                            name="rating"
                            ref={rating}>
                            {currentRating(todoInfo.fields.DIfficulty).map((rate, idx) => {
                                return <option key={idx}>{rate}</option>
                            })}
                        </select>
                        : ''}

                    <div className={style.itemInfo}>
                        <Interval
                            date={(todoInfo.fields.Deadline) ? formatDate(todoInfo.fields.Deadline) : 'No Data'}
                            dead_line={dead_line}
                            editing={editing} />
                    </div>

                    <button
                        className={(outside) ? style.outsideButton : style.insideButton}
                        onClick={setBtns}>
                        {(editBtns) ? 'Close Edit' : 'Edit Item'}
                    </button>

                    {(editBtns)
                        ? <>
                            {setTodoId(todoInfo.id)}
                            <button
                                type="button"
                                className={style.button}
                                onClick={editSettings}>
                                {(editing) ? 'Close Update' : 'Update Todo'}
                            </button>
                            <button
                                type="button"
                                onClick={() => removeTodo(todoInfo.id)}
                                className={style.button}
                                ref={removeBtn} >
                                Remove Todo
                            </button>
                            <button
                                type="submit"
                                onClick={updateTodo}
                                hidden={true}
                                name='saveBtn'
                                ref={saveBtn}>
                                Save Data
                            </button>
                        </>
                        : ''}
                </div>
                : ''}
        </>
    )
}

TodoBox.propTypes = {
    removeTodo: PropTypes.func,
    editSettings: PropTypes.func,
    setEditBtns: PropTypes.func,
    updateTodo: PropTypes.func,
    setTodoId: PropTypes.func,
}

export default TodoBox