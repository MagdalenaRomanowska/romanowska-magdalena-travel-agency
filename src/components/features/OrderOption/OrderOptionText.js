import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';

const OrderOptionText = ({text, setOptionValue}) => (
  <div className={styles.number}>
    <input 
      className={styles.input}
      type={text}
      onChange={event => setOptionValue(event.currentTarget.value)}
    >
    </input>
  </div>
);

OrderOptionText.propTypes = {
  text: PropTypes.string,
  setOptionValue: PropTypes.func,
};

export default OrderOptionText;
