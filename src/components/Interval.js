import React, { useState, useEffect } from 'react';
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

const Interval = ({
    date,
    editing,
    dead_line
}) => {
    const formatData = new Date(date)
    const todoDate = Date.parse(formatData)
    const now = new Date().getTime()
    const builtTime = now - todoDate
    const todoSeconds = Math.floor((builtTime % (1000 * 60)) / 1000)
    const todoMinutes = Math.floor((builtTime % (1000 * 60 * 60)) / (1000 * 60))
    const todoHours = Math.floor((builtTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const todoDays = Math.floor(builtTime / (1000 * 60 * 60 * 24))
    const [seconds, setSeconds] = useState(59 - todoSeconds);
    const [minutes, setMinutes] = useState(59 - todoMinutes)
    const [hours, setHours] = useState(60 - todoHours)
    const [days, setDays] = useState(todoDays)
    const [showDeadline, setShowDeadline] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => (seconds <= 0) ? seconds = 59 : seconds = seconds - 1)
            setMinutes(minutes => (seconds === 0) ? minutes = minutes - 1 : (minutes <= 0) ? minutes = 59 : minutes)
            setHours(hours => (minutes === 0 && seconds === 0) ? hours = hours - 1 : hours)
            setDays(days => {
                if (hours > 24) {
                    setHours(hours - 24)
                    return days = days + 1
                } else if (hours === 0 && seconds === 0) {
                    return days = days - 1
                } else {
                    return days
                }
            })
        }, 1000);
        return () => { clearInterval(interval) };
    }, [seconds]);

    const setDeadline = (event) => {
        event.preventDefault()
        return (event.target.value === 'y') ? setShowDeadline(true) : setShowDeadline(false)
    }
    return (
        <>
            {
                (date !== 'No Data')
                    ? <div className={style.counter}>
                        <div>Your Current Deadline is: {date}</div>
                        You have {days} <small>days</small> , {hours} <small>hours</small> , {minutes} <small>minutes</small> <small>&amp;</small> , {seconds} <small>seconds</small> before you reach your deadline!!!
                    </div>
                    : <div>
                        Deadline: You have not set a deadline.
                        {(editing)
                            ? <form onChange={setDeadline}>
                                Want to Set One?
                                <label>Yes</label>
                                <input
                                    type='radio'
                                    name="set"
                                    value='y'
                                />
                                <label>No</label>
                                <input
                                    type='radio'
                                    name="set"
                                    value='n'
                                    defaultChecked
                                />
                            </form>
                            : ''}

                        {(showDeadline)
                            ? <input
                                type='date'
                                className={style.date}
                                min={new Date().toISOString().split('T')[0]}
                                name='dead_line'
                                ref={dead_line}
                                defaultValue='No Data' />
                            : ''}
                    </div>
            }
        </>
    );
};
Interval.propTypes = {
    editing: PropTypes.bool,
    date: PropTypes.string,
    dead_line: PropTypes.string
}



export default Interval;