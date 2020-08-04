import React from 'react';
import PropTypes from 'prop-types';
//import styles from './OrderForm.scss';
import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';

const OrderForm = props => (
  <div>
    <Row>
      <Col xs={12}>  
        <OrderSummary summaryCost={props.tripCost} options={props.options}
        />
      </Col>
    </Row>
  </div>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.any,
};

export default OrderForm;
