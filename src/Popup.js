import React from 'react';
import './style.css';
import Button from 'react-bootstrap/Button'

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
          <input type="text" name="taskname" value="" />
          <button onClick={this.props.closePopup}>close me</button>
          <Button type='submit'>Submit</Button>
        </div>
      </div>
    );
  }
}

export default Popup;