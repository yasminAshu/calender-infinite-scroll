
import React from "react";
import moment from 'moment';
export default class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            month: [moment()],
            selected: moment().startOf('day')
        };

        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
    }

    componentDidMount() {
        this.refs.iScroll.addEventListener("scroll", (e) => {
            let scrollPosition = Number(e.target.scrollTop+e.target.clientHeight+100)
            console.log('mmmmmmmmmm',scrollPosition,e.target.scrollHeight)
            if (scrollPosition >= e.target.scrollHeight){
                this.next();
            }/* else if(scrollPosition <= e.target.scrollHeight){
                this.previous();
            } */
        });
    }

    previous() {
        let month = this.state.month;
        let lastMonth = month[month.length-1];
        month.push(lastMonth.subtract(1, 'month'))
        this.setState({
            month:month 
        });
    }

    next() {
        let month = this.state.month;
        let lastMonth = month[month.length-1];
        month.push(lastMonth.add(1, 'month'))
        this.setState({
            month:month 
        });
    }

    select(day) {
        this.setState({
            selected: day.date,
            month: day.date.clone(),
        });
    }

   
    renderMonthLabel() {
        
            let month = this.state.month[this.state.month.length-1];

        return <span className="month-label">{month.format("MMMM YYYY")}</span>;
    }
    

    render() {
        let cMonths = this.state.month.map((mon,index)=>{
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
class Months extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded:true
        };

    }
    
    renderWeeks() {
        let weeks = [];
        let done = false;
        let date = this.props.month.clone().startOf("month").add("w" - 1).day("Sunday");
        let count = 0;
        let monthIndex = date.month();

        const {
            selected,
            month,
        } = this.props;

        while (!done) {
            weeks.push(
                <Week key={date}
                    date={date.clone()}
                    month={month}
                    select={(day) => this.props.select(day)}
                    selected={selected} />
            );

            date.add(1, "w");

            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }

        return weeks;
    };
    render() {
        return (
            <div>
                <section >
                
                {this.renderWeeks()}
                </section>
            </div>
        );
    }
}
class DayNames extends React.Component {
    render() {
        return (
            <div className="row day-names">
                <span className="day">Sun</span>
                <span className="day">Mon</span>
                <span className="day">Tue</span>
                <span className="day">Wed</span>
                <span className="day">Thu</span>
                <span className="day">Fri</span>
                <span className="day">Sat</span>
            </div>
        );
    }
}

class Week extends React.Component {
    render() {
        let days = [];
        let {
            date,
        } = this.props;

        const {
            month,
            selected,
            select,
        } = this.props;

        for (var i = 0; i < 7; i++) {
            let day = {
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            };
            days.push(
                <Day day={day}
                    selected={selected}
                    select={select} />
            );

            date = date.clone();
            date.add(1, "day");
        }

        return (
            <div className="row week" key={days[0]}>
                {days}
            </div>
        );
    }

}

class Day extends React.Component {
    render() {
        const {
            day,
            day: {
                date,
                isCurrentMonth,
                isToday,
                number
            },
            select,
            selected
        } = this.props;

        return (
            <span
                key={date.toString()}
                className={"day" + (isToday ? " today" : "") + (isCurrentMonth ? "" : " different-month") + (date.isSame(selected) ? " selected" : "")}
                onClick={() => select(day)}>{number}</span>
        );
    }
}
