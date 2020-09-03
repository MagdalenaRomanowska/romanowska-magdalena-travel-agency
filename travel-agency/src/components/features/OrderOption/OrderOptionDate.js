import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import styles from './OrderOption.scss';
//z dokumentacji online Datepicker, w zasadzie cały komponent.

class OrderOptionDate extends React.Component { 
  state = {
    startDate: new Date(),
  };
 
  handleChange = date => {
    this.setState({
      startDate: date,
    });
  };
 
  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        className={styles.datepicker}
      />
    );
  }
}

export default OrderOptionDate;

