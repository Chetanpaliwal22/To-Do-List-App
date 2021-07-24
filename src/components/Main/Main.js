import React, { Component } from "react";
import TodoItem from '../TodoItem/ToDoItem';
import { db } from '../../firebase';
import firebase from "firebase";
import Header from '../Header/Header';
import TaskForm from "../TaskForm/TaskForm";
import Signin from '../Signin/Signin';
import './Main.css';
import { Link } from 'react-router-dom';

class Main extends Component {

    constructor() {
        super()

        this.state = {
            todos: [],
            showTaskForm: false,
            userInfo: {},
            completedTaskMode: false,
            showLoginPopup: false
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

    toggleCompletedTaskMode = (mode) => this.setState({ completedTaskMode: mode });
    toggleShowTaskFormMode = (mode) => this.setState({ showTaskForm: mode });
    toggleLoginPopup = (mode) => this.setState({ showLoginPopup: mode });

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
        db.collection('ToDoList').doc(newTodo.userId.toString()).set(newTodo).then(() => {
            const { todos } = this.state;
            todos.push(newTodo);
            this.setState({
                todos,
                showTaskForm: false
            })
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    }

    handleChange = (id) => {

        const { todos } = this.state;
        db.collection("ToDoList").doc(id.toString()).update({
            "status": "completed",
        }).then(() => {
            const updatedTodos = todos.map(todo =>
                todo.userId === id
                    ? { ...todo, status: 'completed' }
                    : todo
            );
            this.setState({ todos: updatedTodos });
        });
    }

    render() {
        const { completedTaskMode, showTaskForm, todos } = this.state;
        const completedtodos = todos.filter((item) => { return item.status === 'completed' }).map((item) => < TodoItem key={item.id} item={item} handleChange={this.handleChange} />)
        const pendingtodos = todos.filter((item) => { return item.status === 'pending' }).map((item) => < TodoItem key={item.id} item={item} handleChange={this.handleChange} />)
        return (
            <div>
                <Header toggleCompletedTaskMode={this.toggleCompletedTaskMode} toggleLoginPopup={this.toggleLoginPopup} />
                <Signin toggleLoginPopup={this.toggleLoginPopup} {...this.state} />
                {completedTaskMode ?
                    <div className="todo-list">
                        {this.showHeaderText("Woo Hoo, You have completed following tasks!")}
                        <div className="scroll-div">
                            {completedtodos}
                        </div>
                    </div> :
                    <div className="todo-list">
                        {this.showHeaderText("Hey there, what's on your mind today?")}
                        <div className="scroll-div">
                            {pendingtodos}
                        </div>
                        {showTaskForm && this.showTaskForm()}
                        <div className="todo-link">
                            <Link onClick={() => this.toggleShowTaskFormMode(true)}>Add Task</Link>
                        </div>
                    </div>}
            </div>
        )
    }

    showHeaderText = (headerText) => {
        return <h3> {headerText} </h3>
    }

    showTaskForm = () => {
        return (
            <TaskForm addToDo={this.addTodo.bind(this)} />
        );
    }

}

export default Main;