
import React from "react";
import moment from 'moment';
import Months from './Months'
import '../css/calender-style.css'
import {DayNames} from "./DayNames"
export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: [moment()],
            selected: moment().startOf('day')
        };
    }

    componentDidMount() {
        this.refs.iScroll.addEventListener("scroll", (e) => {
            let scrollPosition = Number(e.target.scrollTop+e.target.clientHeight+100)
            console.log('mmmmmmmmmm',scrollPosition,e.target.scrollHeight)
            if(e.which===40){
                e.target.scrollTop = e.target.scrollTop + 24;
                }
            if (scrollPosition >= e.target.scrollHeight){
                this.next();
            }
        });
    }

    previous = () => {
        let month = this.state.month;
        let lastMonth = month[month.length-1];
        month.push(lastMonth.subtract(1, 'month'))
        this.setState({
            month:month 
        });
    }

    next = () =>{
        let month = this.state.month;
        let lastMonth = month[month.length-1];
        month.push(lastMonth.add(1, 'month'))
        this.setState({
            month:month 
        });
    }

    select = (day) =>{
        this.setState({
            selected: day.date,
            month: day.date.clone(),
        });
    }

    renderMonthLabel = () =>{
        let month = this.state.month[this.state.month.length-1];
        return <span className="month-label">{month && month.format("MMMM YYYY")}</span>;
    }
    

    render() {
        let cMonths = Array.isArray(this.state.month) && this.state.month.map((mon,index)=>{
            return (<Months select={this.select} selected={this.state.selected} month={mon}/>)
        })
        return (
            <div>
           <section ref="iScroll" className="calendar">
           <header className="header">
                    <div className="month-display row">
                        <i className="arrow fa fa-angle-left" onClick={this.props.previous} />
                        {this.renderMonthLabel()}
                        <i className="arrow fa fa-angle-right" onClick={this.props.next} />
                    </div>
                    <DayNames />
                </header>
           {cMonths}
           </section>
           </div>
        );
    }
}






