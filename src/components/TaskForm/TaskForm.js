import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { FormFeedback, Input } from 'reactstrap';
import { minLength } from '../../utils/Validation';

class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task: '',
            taskValid: true,
        }
    }

    handleSubmit = (event) => {
        const isFormValid = minLength(this.state.task, 1);
        if (!isFormValid) {
            this.setState({
                taskValid: minLength(this.state.task, 1)
            });
            return;
        }
        const { addToDo, userInfo } = this.props;
        const newTodo = {
            userId: Date.now(),
            userName: userInfo.userName,
            userEmail: userInfo.userEmail,
            task: this.state.task,
            status: 'pending',
            dateCreated: Date.now()
        }
        addToDo(newTodo);
    }

    onTaskchange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            taskValid: minLength(event.target.value, 1)
        });
    }

    render() {
        return (
            <Form>
                <Form.Group controlId="formTask">
                    <Form.Label>Task Detail</Form.Label>
                    <Input invalid={!this.state.taskValid} type="task" name="task" id="task" maxLength={30} placeholder="Enter task name." value={this.state.task} onChange={this.onTaskchange} />
                    <FormFeedback>Task can't be empty.</FormFeedback>
                </Form.Group>
                <Link onClick={this.handleSubmit}>
                    Add
                </Link>
            </Form>
        )
    };
}

export default TaskForm;