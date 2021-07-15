import React, { Component } from "react";
import TodoItem from '../ToDoItem';
import Button from 'react-bootstrap/Button';
import { db } from '../firebase';
import firebase from "firebase";
import Header from './HeaderComponent';
import AddTaskForm from "./AddTaskFormComponent";

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
        let tododatas = await db.collection("ToDoList").where("completed", "==", false).get();
        let list = tododatas.docs.map(doc => {
            return doc.data()
        })
        this.setState({
            todos: list
        })
    };

    addTodo = (newTodo) => {
        db.collection('ToDoList').doc(newTodo.id.toString()).set(newTodo).then(() => {
            this.state.todos.push(newTodo)
            this.setState({
                todos: this.state.todos,
                showForm: false
            })
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
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
            <AddTaskForm addToDo={this.addTodo.bind(this)} state={this.state} />
        );
    }

}

export default Main;