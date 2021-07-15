import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class AddTaskForm extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ showForm: false })
        let id = Date.now();
        let newTodo = {
            id: id,
            text: this.inputNode.value,
            completed: false
        }
        this.props.addToDo(newTodo);     
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
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
                <Button variant="primary" type="submit">
                    Add
                </Button>
            </Form>
        )
    };
}

export default AddTaskForm;