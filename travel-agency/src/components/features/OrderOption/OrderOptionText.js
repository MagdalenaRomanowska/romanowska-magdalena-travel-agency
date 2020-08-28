import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';

const OrderOptionText = ({text}) => (
  <div className={styles.number}>
    <input 
      className={styles.input}
      type={text}
    >
    </input>
  </div>
);

OrderOptionText.propTypes = {
  text: PropTypes.string,
};

export default OrderOptionText;
