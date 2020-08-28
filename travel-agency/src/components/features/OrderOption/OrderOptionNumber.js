import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';

const OrderOptionNumber = ({currentValue, limits, setOptionValue, price}) => (
  <div className={styles.number}>
    <input 
      className={styles.inputSmall}
      type='number'
      value={currentValue}
      min={limits.min}
      max={limits.max}
      onChange={event => setOptionValue(event.currentTarget.value)} //do eventu zmiany wartości (onChange) przypisaliśmy funkcję strzałkową. Ta funkcja przyjmuje event jako argument i zwraca wywołanie funkcji setOptionValue, której argumentem jest wartość elementu.
    >
    </input>
    <div className={styles.price}>
        Option price for 1 person: {price}
    </div>
  </div>
);

OrderOptionNumber.propTypes = {
  currentValue: PropTypes.number,
  limits: PropTypes.any,
  setOptionValue:  PropTypes.func,
  price: PropTypes.any,
};

export default OrderOptionNumber;
