import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';
//z dokumentacji online Datepicker, w zasadzie cały komponent.

class OrderOptionDate extends React.Component { 

  render() {
    const {currentValue, setOptionValue} = this.props; 
    return (
      <DatePicker
        selected={currentValue}
        onChange={date => setOptionValue(date)}
        className={styles.datepicker}
      />
        
    );
  }
}

OrderOptionDate.propTypes = {
  currentValue: PropTypes.any,
  setOptionValue: PropTypes.func,
};

export default OrderOptionDate;

