import React, { Component } from "react";
import Header from '../Header/Header'
import Form from "react-bootstrap/Form";

class Signup extends Component {

    render() {
        return (
            <div >
                <Header />
                <Form className="todo-list">
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password" />
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password" />
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default Signup;