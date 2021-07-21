import React, { Component } from "react";
import Header from '../Header/Header';
import './Home.css'
import { Link } from 'react-router-dom'

class Home extends Component {

    render() {
        return (
            <div>
                <Header />
                <div className="todo-list">
                    <h3 className="h3"> “One of the secrets of getting more done is to make a TO-DO List every day, keep it visible.”</h3>
                    <h4> — Alan Lakein</h4>
                    <div className="linkgroup link">
                        <Link>Login</Link>
                        <Link>Explore as guest</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;