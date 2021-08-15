import React, { Component } from "react";
import './Home.css';
import { Link } from 'react-router-dom';

class Home extends Component {

    render() {

        const { toggleSigninPopup } = this.props;

        return (
            <div className="todo-list">
                <h3 className="h3"> “One of the secrets of getting more done is to make a TO-DO List every day, keep it visible.”</h3>
                <h4> — Alan Lakein</h4>
                <div className="linkgroup link">
                    Sign-in and explore the To-Do List app - <Link onClick={() => toggleSigninPopup(true)}> Signin</Link>
                </div>
            </div>
        );
    }
}

export default Home;