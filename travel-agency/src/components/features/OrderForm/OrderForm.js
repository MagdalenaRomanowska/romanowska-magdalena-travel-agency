import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderForm.scss';
import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import pricing from '../../../data/pricing.json';

const OrderForm = props => (
  <div>
    <Row>
      {pricing.map(option => (
        <Col className={styles.options} md={6} lg={4} key={option.id}>
          <OrderOption {...option} 
            currentValue={props.options[option.id]} 
            setOrderOption={props.setOrderOption}
          />
        </Col>
      ))}
      <Col className={styles.summary} xs={12}> 
        <div className={styles.total}>
          <OrderSummary summaryCost={props.tripCost} options={props.options}
          />
        </div>
      </Col>
    </Row>
  </div>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.any,
  setOrderOption: PropTypes.func,
};

export default OrderForm;
