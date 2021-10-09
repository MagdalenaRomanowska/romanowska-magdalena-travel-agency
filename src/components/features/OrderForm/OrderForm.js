import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderForm.scss';
import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import pricing from '../../../data/pricing.json';
import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';
import settings from '../../../data/settings';
import Button from '../../common/Button/Button';

const sendOrder = (options, tripCost, tripId, tripName, countryCode) => {
  
  const totalCost = formatPrice(calculateTotal(tripCost, options));
  console.log('przychodzi:', options, tripCost);
  const payload = {
    ...options,
    totalCost,
    tripId,
    tripName,
    countryCode,
  };
  console.log('przychodzi payload.name:', payload.name);
  console.log('przychodzi payload.contact:', payload.contact);

  if(payload.name=='' || payload.contact==''){
    return; //nie powinniśmy umożliwiać wysłania zamówienia, jeśli pola name i contact są puste.
  }

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

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
        <Button onClick={() => sendOrder(
          props.options, 
          props.tripCost, 
          props.tripId, 
          props.tripName,
          props.countryCode
        )}>Order now!</Button>
      </Col>
    </Row>
  </div>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  tripId: PropTypes.string,
  tripName: PropTypes.string,
  options: PropTypes.any,
  setOrderOption: PropTypes.func,
  countryCode: PropTypes.string,
};

export default OrderForm;
