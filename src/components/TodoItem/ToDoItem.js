import React from "react"
import "../../style.css"

function TodoItem(props) {
    return (
        <div className="todo-item">
            <label>
            <input 
                type="radio" 
                checked={props.item.status === 'completed'} 
                onChange={() => props.handleChange(props.item.userId)}
            />
            </label>
            <p>{props.item.task}</p>
        </div>
    )
}

export default TodoItem