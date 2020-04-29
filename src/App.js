import React from 'react';
import tododatas from './tododatas'
import TodoItem from './ToDoItem'
import { Button } from 'react-bootstrap';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: tododatas
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(id) {
    this.setState(prevState => {
      const updatedTodos = prevState.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
      return {
        todos: updatedTodos
      }
    })
  }

  render() {
    const todoItems = this.state.todos.map(item => <TodoItem key={item.id} item={item} handleChange={this.handleChange} />)

    return (
      <div className="todo-list">
        <div >
          <h1> TO-DO LIST </h1>
          <h3>Hey Chetan, what's on your mind today?</h3>
          {todoItems}
        </div>

        <div className="todo-button">
          <Button bsStyle="success">Add Task</Button>
          <Button bsStyle="danger">Delete Task</Button>
        </div>
      </div>
    )
  }

}
export default App;
