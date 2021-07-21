import React from "react"
import "../../style.css"

function TodoItem(props) {
    return (
        <div className="todo-item">
            <label>
            <input 
                type="radio" 
                checked={props.item.completed} 
                onChange={() => props.handleChange(props.item.id)}
            />
            </label>
            <p>{props.item.text}</p>
        </div>
    )
}

export default TodoItem