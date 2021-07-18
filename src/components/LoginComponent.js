import React, { Component } from "react";
import Header from './HeaderComponent';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import './Login.css';

class Login extends Component {

    render() {
        return (
            <div >
                <Header />
                <Form className="todo-list">
                    <FormGroup className="formgroup">
                        <Label for="email" className="label">Email:</Label>
                        <Input type="email" name="email" id="email" placeholder="Please enter your email." />
                    </FormGroup>
                    <FormGroup className="formgroup">
                        <Label for="password" className="label">Password:</Label>
                        <Input type="password" name="password" id="password" placeholder="Please enter your password." />
                    </FormGroup>
                    <div className="form-group row">
                        <Button variant="outline-success">Submit</Button>
                        <Button variant="outline-secondary">Continue as Guest</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Login;