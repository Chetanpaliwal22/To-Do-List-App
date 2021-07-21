import React, { Component } from "react";
import TodoItem from '../TodoItem/ToDoItem';
import Button from 'react-bootstrap/Button';
import { db } from '../../firebase';
import firebase from "firebase";
import Header from '../Header/Header';
import TaskForm from "../TaskForm/TaskForm";
import './Main.css';

class Main extends Component {

    constructor() {
        super()

        this.state = {
            todos: [],
            showForm: false,
            userInfo: {},
            completedTaskMode: false
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

    toggleTaskMode = (mode) => this.setState({ completedTaskMode: mode });
    toggleShowForm = (mode) => this.setState({ showForm: mode });

    updateContent = async () => {
        let tododatas = await db.collection("ToDoList").get();
        let list = tododatas.docs.map(doc => {
            return doc.data()
        })
        this.setState({
            todos: list
        })
    };

    addTodo = (newTodo) => {
        db.collection('ToDoList').doc(newTodo.id.toString()).set(newTodo).then(() => {
            const { todos } = this.state;
            todos.push(newTodo);
            this.setState({
                todos,
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
        const { completedTaskMode, showForm, todos } = this.state;
        const todoItems = todos.filter((item) => { return item.completed === completedTaskMode }).map((item) => < TodoItem key={item.id} item={item} handleChange={this.handleChange} />)

        return (
            <div>
                <Header toggleTaskMode={this.toggleTaskMode} />
                {completedTaskMode ?
                    <div className="todo-list">
                        {this.showHeaderText("Woo Hoo, You have completed following tasks!")}
                        <div className="scroll-div">
                            {todoItems}
                        </div>
                    </div> :
                    <div className="todo-list">
                        {this.showHeaderText("Hey there, what's on your mind today?")}
                        <div className="scroll-div">
                            {todoItems}
                        </div>
                        {showForm && this.showForm()}
                        <div className="todo-button">
                            <Button variant="outline-success" onClick={() => this.toggleShowForm(true)} disabled={showForm}>Add Task</Button>
                        </div>
                    </div>}
            </div>
        )
    }

    showHeaderText = (headerText) => {
        return <h3> {headerText} </h3>
    }

    showForm = () => {
        return (
            <TaskForm addToDo={this.addTodo.bind(this)} />
        );
    }

}

export default Main;