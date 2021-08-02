import React, { Component } from "react";
import TodoItem from '../TodoItem/ToDoItem';
import { db } from '../../firebase';
import Header from '../Header/Header';
import TaskForm from "../TaskForm/TaskForm";
import Signin from '../Signin/Signin';
import Signup from "../Signup/Signup";
import Leaderboard from "../Leaderboard/Leaderboard";
import firebase from "firebase";
import Loading from '../Loading/Loading'
import './Main.css';
import { Link } from 'react-router-dom';

class Main extends Component {

    constructor() {
        super()

        this.state = {
            todos: [],
            showTaskForm: false,
            userInfo: {
                userName: '',
                userEmail: '',
                userId: ''
            },
            isLoading: true,
            userScore: -1,
            completedTaskMode: false,
            showSigninPopup: false,
            showSignupPopup: false,
            showLeaderboardPopup: false,
            releaseVersion: '1.0'
        }
    }

    async componentDidMount() {
        this.updateContent();
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                localStorage.removeItem("firebaseAuthInProgress");
                localStorage.setItem(this.appTokenKey, user.uid);
                const userInfo = {
                    userName: user.displayName,
                    userEmail: user.email,
                    userId: user.email
                };
                this.updateUserInfo(userInfo);
            }
        });
    }

    toggleCompletedTaskMode = (mode) => this.setState({ completedTaskMode: mode });
    toggleShowTaskFormMode = (mode) => this.setState({ showTaskForm: mode });
    updateUserInfo = (userInfo) => this.setState({ userInfo });
    toggleSigninPopup = () => this.setState({ showSigninPopup: !this.state.showSigninPopup });
    toggleSignupPopup = () => this.setState({ showSignupPopup: !this.state.showSignupPopup });
    toggleLeaderboardPopup = () => this.setState({ showLeaderboardPopup: !this.state.showLeaderboardPopup });
    toggleLoadingMode = () => this.setState({ isLoading: !this.state.isLoading });

    handleLogOut = () => {
        this.toggleLoadingMode();
        firebase.auth().signOut().then(function () {
            localStorage.removeItem("appToken");
            const userInfo = {
                userName: '',
                userEmail: '',
                userId: ''
            };
            this.updateUserInfo(userInfo);
            this.toggleLoadingMode();
        }.bind(this));
    };

    updateContent = async () => {
        let tododatas = await db.collection("ToDoList").get();
        let list = tododatas.docs.map(doc => {
            let data = doc.data();
            return {
                userId: data.userId,
                task: data.task,
                userEmail: data.userEmail,
                status: data.status,
                userName: data.userName
            }
        });
        this.setState({
            todos: list,
            isLoading: false
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
            )
            this.setState({ todos: updatedTodos });
        });
    }

    render() {
        const { completedTaskMode, showTaskForm, todos, userInfo } = this.state;
        const completedtodos = todos.filter((item) => { return (item.status === 'completed' && item.userEmail === userInfo.userEmail) }).map((item) => < TodoItem key={item.userId} item={item} handleChange={this.handleChange} />);
        const pendingtodos = todos.filter((item) => { return item.status === 'pending' && item.userEmail === userInfo.userEmail }).map((item) => < TodoItem key={item.userId} item={item} handleChange={this.handleChange} />);
        const userName = userInfo.userName === '' ? 'there' : userInfo.userName;
        return (
            <div>
                <Header toggleCompletedTaskMode={this.toggleCompletedTaskMode} toggleSigninPopup={this.toggleSigninPopup} toggleSignupPopup={this.toggleSignupPopup} toggleLeaderboardPopup={this.toggleLeaderboardPopup} handleLogOut={this.handleLogOut} {...this.state} />
                <Signin toggleSigninPopup={this.toggleSigninPopup} toggleLoadingMode={this.toggleLoadingMode} updateContent={this.updateContent} {...this.state} updateUserInfo={this.updateUserInfo} />
                <Signup toggleSignupPopup={this.toggleSignupPopup} toggleLoadingMode={this.toggleLoadingMode} {...this.state} updateUserInfo={this.updateUserInfo} />
                <Leaderboard toggleLeaderboardPopup={this.toggleLeaderboardPopup} data={completedtodos} {...this.state} />
                {this.state.isLoading ?
                    <Loading /> : <div>
                        {completedTaskMode ?
                            <div className="todo-list">
                                {this.showHeaderText("Woo Hoo, You have completed following tasks!")}
                                <div className="scroll-div">
                                    {completedtodos}
                                </div>
                            </div> :
                            <div className="todo-list">
                                {this.showHeaderText("Hey " + userName + ", what's on your mind today?")}
                                <div className="scroll-div">
                                    {pendingtodos}
                                </div>
                                {showTaskForm && this.showTaskForm()}
                                <div className="todo-link">
                                    <Link onClick={() => this.toggleShowTaskFormMode(true)}>Add Task</Link>
                                </div>
                            </div>} </div>
                }
            </div>
        )
    }

    showHeaderText = (headerText) => {
        return <h3> {headerText} </h3>
    }

    showTaskForm = () => {
        return (
            <TaskForm addToDo={this.addTodo.bind(this)} {...this.state} />
        );
    }

}

export default Main;