import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderSummary.scss';
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';

const OrderSummary = props => (
  <div>
    <h2 className={styles.component}>
    Total: {calculateTotal(formatPrice(props.summaryCost), props.options)}
    </h2>
  </div>
);

OrderSummary.propTypes = {
  summaryCost: PropTypes.string,
  options: PropTypes.any,
};

export default OrderSummary;
