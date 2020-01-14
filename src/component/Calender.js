import React from "react";
import moment from "moment";
import Months from "./Months";
import "../css/calender-style.css";
import { DayNames } from "./DayNames";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: [moment()],
      selected: moment().startOf("day")
    };
  }

  componentDidMount() {
    this.refs.iScroll.addEventListener("scroll", e => {
      this.handleScroll(e);
    });
  }

  /**
   *@discription - This function is to handle the scroll position of the calender
    @param e - current target
   */
  handleScroll = e => {
    let scrollPosition = Number(
      e.target.scrollTop + e.target.clientHeight + 100
    );
    if (scrollPosition >= e.target.scrollHeight) {
      this.next();
    }
  };

  /**
   *@discription - This function is to load the previous calender
   */
  previous = () => {
    let month = this.state.month;
    let lastMonth = month[month.length - 1];
    month.push(lastMonth.subtract(1, "month"));
    this.setState({
      month: month
    });
  };

  /**
   *@discription - This function is to load the next calender
   */
  next = () => {
    let month = this.state.month;
    let lastMonth = month[month.length - 1];
    month.push(lastMonth.add(1, "month"));
    this.setState({
      month: month
    });
  };

  /**
   *@discription - This function is to render the header of the calender
   */
  renderMonthLabel = () => {
    let month = this.state.month[this.state.month.length - 1];
    return (
      <span className="month-label">{month && month.format("MMMM YYYY")}</span>
    );
  };

  render() {
    let cMonths =
      Array.isArray(this.state.month) &&
      this.state.month.map((mon, index) => {
        return (
          <Months
            select={this.select}
            selected={this.state.selected}
            month={mon}
          />
        );
      });
    return (
      <div>
        <section ref="iScroll" className="calendar">
          <header className="header">
            <div className="month-display row">
              <i
                className="arrow fa fa-angle-left"
                onClick={this.props.previous}
              />
              {this.renderMonthLabel()}
              <i
                className="arrow fa fa-angle-right"
                onClick={this.props.next}
              />
            </div>
            <DayNames />
          </header>
          {cMonths}
        </section>
      </div>
    );
  }
}
