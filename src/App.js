import React from 'react'
import TodoItem from './ToDoItem'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { db } from './firebase'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      todos: [],
      showForm: false
    }

    this.deleteTask = this.deleteTask.bind(this)
  }

  async componentDidMount() {
    let tododatas = await db.collection("DataList").get()
    let list = tododatas.docs.map(doc => {
      return doc.data()
    })
    this.setState({
      todos: list
    })
  }

  handleChange = (id) => {
    let updatedTodos = this.state.todos.map(todo => {
      //console.log(todo.completed)
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })

    this.setState(updatedTodos)
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
        {this.state.showForm ? this.showForm() : null}
        <div className="todo-button">
          <Button variant="outline-success" onClick={() => this.setState({ showForm: true })}>Add Task</Button>
          <Button variant="outline-danger" onClick={this.deleteTask}>Delete Task</Button>
        </div>
      </div>
    )
  }

  showForm = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formTask">
          <Form.Label>Task Detail</Form.Label>
          <Form.Control type="text" placeholder="Enter task name." ref={node => (this.inputNode = node)} />
          <Form.Text className="text-muted">
            We'll be pushing this task to Firebase DB.
        </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Prove that, you are not a robot." />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
      </Button>
      </Form>
    );
  }

  handleSubmit = (event) => {
    this.setState({ showForm: false })
    let id = Date.now();
    let newTask = {
      id: id,
      text: this.inputNode.value,
      completed: false
    }
    db.collection('DataList').doc(id.toString()).set(newTask)
    this.state.todos.push(newTask)
  }

  async deleteTask () {
    let updatedTodos = this.state.todos.map(todo => {
      if (todo.completed) {
        db.collection("DataList")
          .doc(todo.id.toString())
          .delete()
      }
      return todo
    })
    let tododatas =await db.collection("DataList").get()
    let list = tododatas.docs.map(doc => {
      return doc.data()
    })
    this.setState({
      todos: list
    })
  }

}
export default App;