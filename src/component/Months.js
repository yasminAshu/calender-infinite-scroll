import React from "react";
import Week from "./Week";

class Months extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true
    };
  }

  renderWeeks() {
    let weeks = [];
    let done = false;
    let date = this.props.month
      .clone()
      .startOf("month")
      .add("w" - 1)
      .day("Sunday");
    let count = 0;
    let monthIndex = date.month();

    const { selected, month } = this.props;

    while (!done) {
      weeks.push(
        <Week
          key={date}
          date={date.clone()}
          month={month}
          select={day => this.props.select(day)}
          selected={selected}
        />
      );

      date.add(1, "w");

      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  }
  render() {
    return (
      <div>
        <section>{this.renderWeeks()}</section>
      </div>
    );
  }
}

export default Months;
