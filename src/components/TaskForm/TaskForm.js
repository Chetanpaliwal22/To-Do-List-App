import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class TaskForm extends Component {

    handleSubmit = (event) => {
        const { addToDo } = this.props;
        const newTodo = {
            id: Date.now(),
            text: this.inputNode.value,
            completed: false
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
                <Button variant="primary" onClick={this.handleSubmit} type="button">
                    Add
                </Button>
            </Form>
        )
    };
}

export default TaskForm;