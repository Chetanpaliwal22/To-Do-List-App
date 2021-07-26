import React from 'react';
import {
    Navbar, NavbarBrand, Nav, Collapse, NavItem, Button
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
class Header extends React.Component {

    render() {
        const { toggleCompletedTaskMode, toggleLoginPopup } = this.props;

        return (

            <div>
                <Navbar dark expand="md header">
                    <div className="container">
                        <NavbarBrand className="mr-auto">TO-Do List</NavbarBrand>
                        <Collapse navbar>
                            <Nav navbar className="headeritem">
                                <NavItem>
                                    <NavLink className="nav-link" to='/To-Do-List-App/home' onClick={() => toggleCompletedTaskMode(false)}><span className="fa fa-home fa-lg"></span> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/To-Do-List-App/completed-task' onClick={() => toggleCompletedTaskMode(true)}><span className="fa fa-list fa-lg"></span> Completed-Tasks</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                {this.props.userInfo.userName !== '' ?
                                    <NavItem>
                                        <NavLink className="nav-link disabled" to='/To-Do-List-App/completed-task'> {this.props.userInfo.userName} <span className="fa fa-angle-down"></span></NavLink>
                                    </NavItem> :
                                    <NavItem>
                                        <Button outline onClick={() => toggleLoginPopup(true)} >
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                        </Button>
                                    </NavItem>}
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        )
    };

}

export default Header;