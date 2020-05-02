import React from 'react';
import tododatas from './tododatas'
import TodoItem from './ToDoItem'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: tododatas,
    }

    this.handleChange = this.handleChange.bind(this)
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  handleChange(id) {
    
    this.setState(prevState => {
      
      let updatedTodos = prevState.todos.map(todo => {
        //console.log(todo.completed)
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
          <Button variant="outline-success" onClick={this.addTask}>Add Task</Button>
          <Button variant="outline-danger" onClick={this.deleteTask}>Delete Task</Button>
        </div>
      </div>
    )
  }

  addTask() {
    let len = tododatas.length
    tododatas.push({
      id: len + 1,
      text: "new task push the code to git and update readme",
      completed: false
    })
    this.setState({
      todos: tododatas
    })
  }

  deleteTask() {
    tododatas.pop();
    this.setState({
      todos: tododatas
    })
  }

}
export default App;
