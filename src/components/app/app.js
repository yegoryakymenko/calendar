import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import DayWindow from '../day-window'

import './app.scss'
// при получении последнего дня месяца при помощи интеджера, значение месяца слетает на минус 1

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь','Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const date = new Date(new Date().getFullYear(),  new Date().getMonth() + 1, 0); // 1 - 12



export default class App extends Component {
    state = {
        year: new Date().getFullYear(),
        month: date.getMonth() + 1,
        day: 0,
        date: date,
        dateName: months[date.getMonth()],
        dates: []
    };


    createCalendar = () => {
        let dates = [];
        const {date, year, month}= this.state;

        for(let i = 1; i <= date.getDate(); i++) {
            let dayName = new Date(year, month - 1, i).getDay() ;
            dates.push(<DayWindow key={i} day={i} dayName={dayName}/>);
        }
        return dates;
    };

    getPrevMonth = () => {
        const { year, month, date } = this.state;
        if (month === 1) {
            this.setState({
                year: year - 1,
                month: 12,
                date: new Date(year - 1, 12, 0),
                dateName: months[11]})

        } else {
            this.setState({
                month: month - 1,
                date: new Date(year, month - 1, 0),
                dateName: months[date.getMonth() - 1]})
        }
    };

    getNextMonth = () => {
        const { year, month } = this.state;
        if (month === 12) {
            this.setState({
                year: year + 1,
                month: 1,
                date: new Date(year + 1, 1  , 0),
                dateName: months[0]});
        } else {
            this.setState({
                month: month + 1,
                date: new Date(year, month + 1, 0),
                dateName: months[month]});
        }

    };



    render() {
        const { year, dateName, dates } = this.state;
        return(
            <div className="container">
                <div className="container-h2">
                    <h2>{dateName} {year}</h2>
                </div>
                <div className="container-buttons">
                    <Button onClick={this.getPrevMonth}>Prev Month</Button>
                    <Button onClick={this.getNextMonth}>Next Month</Button>
                </div>
                <div className="container-box">
                    {this.createCalendar().map(item => item)}
                </div>
            </div>
            )
    }
};


