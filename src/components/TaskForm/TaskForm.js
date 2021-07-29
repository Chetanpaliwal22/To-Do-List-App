import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

class TaskForm extends Component {

    handleSubmit = (event) => {
        const { addToDo, userInfo } = this.props;
        const newTodo = {
            userId: Date.now(),
            userName: userInfo.userName,
            userEmail: userInfo.userEmail,
            task: this.inputNode.value,
            status: 'pending',
            dateCreated: Date.now()
        }
        addToDo(newTodo);
    }

    render() {
        return (
            <Form>
                <Form.Group controlId="formTask">
                    <Form.Label>Task Detail</Form.Label>
                    <Form.Control type="text" maxLength={30} placeholder="Enter task name." required ref={node => (this.inputNode = node)} />
                </Form.Group>
                <Link onClick={this.handleSubmit}>
                    Add
                </Link>
            </Form>
        )
    };
}

export default TaskForm;