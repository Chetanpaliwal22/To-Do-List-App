import React, { Component } from "react";
import TodoItem from '../ToDoItem';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { db } from '../firebase';
import firebase from "firebase";
import Header from './HeaderComponent';

class Main extends Component {

    constructor() {
        super()

        this.state = {
            todos: [],
            showForm: false,
            userInfo: {}
        }
    }

    async componentDidMount() {
        //Signing in anonymous user
        try {
            await firebase.auth().signInAnonymously()
        }
        catch (error) {
            //Handle Error here
        }

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                let userInfo = {
                    isAnonymous,
                    uid
                }
                this.setState({ userInfo })
            } else {
                // User is signed out.
            }
        });

        this.updateContent()
    }

    updateContent = async () => {
        let tododatas = await db.collection("ToDoList").get()
        let list = tododatas.docs.map(doc => {
            return doc.data()
        })
        this.setState({
            todos: list
        })
    }

    handleChange = (id) => {

        db.collection("ToDoList").doc(id.toString()).update({
            "completed": true,
        }).then(() => {
            let updatedTodos = this.state.todos.filter(function (todo) {
                return todo.id !== id;
            });
            this.setState({ todos: updatedTodos });
        });
    }

    render() {
        const todoItems = this.state.todos.map(item => <TodoItem key={item.id} item={item} handleChange={this.handleChange} />)

        return (
            <div>
                <Header />
                <div className="todo-list">
                    <div >
                        <h3>Hey there, what's on your mind today?</h3>
                        {todoItems}
                    </div>
                    {this.state.showForm ? this.showForm() : null}
                    <div className="todo-button">
                        <Button variant="outline-success" onClick={() => this.setState({ showForm: true })} disabled={this.state.showForm}>Add Task</Button>
                    </div>
                </div>
            </div>
        )
    }

    showForm = () => {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formTask">
                    <Form.Label>Task Detail</Form.Label>
                    <Form.Control type="text" maxLength={30} placeholder="Enter task name." required ref={node => (this.inputNode = node)} />
                    <Form.Text className="text-muted">
                        We'll be pushing this task to DB.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" required label="Prove that, you are not a robot." />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add
                </Button>
            </Form>

        );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ showForm: false })
        let id = Date.now();
        let newTask = {
            id: id,
            text: this.inputNode.value,
            completed: false
        }
        db.collection('ToDoList').doc(id.toString()).set(newTask).then(() => {
            this.state.todos.push(newTask)
            this.setState({
                todos: this.state.todos,
                showForm: false
            })
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    }

}

export default Main;