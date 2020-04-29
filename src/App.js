import React from 'react';
import tododatas from './tododatas'
import TodoItem from './ToDoItem'
import Button from 'react-bootstrap/Button'
import Popup from './Popup';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: tododatas,
      showPopup: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
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

        <Button type='submit'>Submit</Button>
        <div className="todo-button">
        <Button variant="danger">Danger</Button>
        <Button type='submit'>Submit</Button>
        <Button variant="outline-primary">Primary</Button>{' '}
          <Button bsstyle="success" onClick={this.togglePopup.bind(this)}>Add Task</Button>

          {this.state.showPopup ?
            <Popup
              text='Click "Close Button" to hide popup'
              closePopup={this.togglePopup.bind(this)}
            />
            : null
          }

          <Button bsstyle="danger" onClick={this.deleteTask}>Delete Task</Button>
        </div>
      </div>
    )
  }

  addTask() {
    this.togglePopup.bind(this)
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
