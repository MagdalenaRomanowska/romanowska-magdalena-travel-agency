import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
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
      />
    );
  }
}

export default OrderOptionDate;



// import PropTypes from 'prop-types';
// import styles from './OrderOption.scss';
// //import DatePicker from "react-datepicker";
// //import 'react-datepicker/dist/react-datepicker-cssmodules.css';

// // let state = {
// //   startDate: new Date()
// // };
 
// // handleChange = date => {
// //   this.setState({
// //   startDate: date
// //   });
// // };

// const OrderOptionDate = ({date}) => (
//   <div className={styles.number}>
//     <input 
//       className={styles.input}
//       type={date}
//     >
//         {/* <DatePicker
//         selected={this.state.startDate}
//         onChange={this.handleChange}
//       /> */}
//     </input>
//   </div>
// );

// OrderOptionDate.propTypes = {
//   date: PropTypes.any,
// };

// export default OrderOptionDate;
