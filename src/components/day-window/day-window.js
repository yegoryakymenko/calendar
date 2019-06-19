import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './day-window.scss';


let inputData = '';

const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

export default class DayWindow extends Component {

        state = {
            show: false,
            title: ''
        };

    handleShow = () => {
        this.setState({ show:  true });
    };

    handleClose = () => {
           this.setState({show: false})
    };
    getInputData = (e) => {
        inputData = e.target.value;
    }
    saveChanges = (value) => {
        this.setState({show:false, title: value})
    }




    ModalWindow = () => {
        return(
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>Add a task</h6>
                    {this.state.title ? this.state.title : 'There is no task for this day'}
                    <div>
                        <input type="text" onChange={this.getInputData}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => this.saveChanges(inputData)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    };

    componentDidUpdate(prevProps, prevState) {
        if(prevState == this.state) {
            this.setState({title: ''});
        }
    }

    render() {
        const { day, dayName } = this.props;
        return(
            <div className="day-block">
                <div onClick={this.handleShow}
                className="day-block__container">

                    <p className="day-block__number">{day} {days[dayName]}</p>
                    <p className="day-block__title">{this.state.title}</p>

                </div>
                {this.ModalWindow()}
            </div>
        )
    }
}