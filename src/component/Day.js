import React from 'react'

const Day = (props)=> {
    const {
        day: {
            date,
            isCurrentMonth,
            isToday,
            number
        },
        selected
    } = props;

    return (
        <span
            key={date.toString()}
            className={"day" + (isToday ? " today" : "") + (isCurrentMonth ? "" : " different-month") + (date.isSame(selected) ? " selected" : "")}>{number}</span>
    );

}
export default Day