import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

class TaskForm extends Component {

    handleSubmit = (event) => {
        const { addToDo } = this.props;
        const newTodo = {
            userId: Date.now(),
            userName: null,
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
                    <Form.Text className="text-muted">
                        We'll be pushing this task to DB.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" required label="Prove that, you are not a robot." />
                </Form.Group>
                <Link onClick={this.handleSubmit}>
                    Add
                </Link>
            </Form>
        )
    };
}

export default TaskForm;