import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import Icon from '../../common/Icon/Icon';
import {formatPrice} from '../../../utils/formatPrice';

const OrderOptionIcons = ({values, required, setOptionValue}) => (
  <div className={styles.icon}>
    
    {required ? '' : (  //blok kodu, który sprawdza, czy props required jest prawdziwy.
      <option key='null' value=''>
        <div className={styles.icon}
          onClick={event => setOptionValue('', event.currentTarget.value)}
        >
          <Icon name={'times-circle'}/> {'none'}
        </div>
      </option> //Jeśli tak, wstawia pusty ciąg znaków, ale jeśli jest fałszywy (albo nie jest ustawiony), to zostanie wyrenderowany <div>.
      //Wykorzystujemy ten zabieg, ponieważ jeśli w pricing.json opcja ma ustawione "required": true, to powinny być do dyspozycji tylko wartości zdefiniowane w tym pliku. Jeśli jednak opcja nie jest wymagana, chcemy dodać <option>, który pozwoli na brak wyboru, czyli rezygnację z tej opcji.
    )}

    {values.map(value => (
      <div className={styles.icon} 
        key={value}
        onClick={event => setOptionValue(event.currentTarget.id)}
      >
        <Icon name={value.icon}/> {value.name} {formatPrice(value.price)}
      </div>
    ))}
  </div>
);

OrderOptionIcons.propTypes = {
  values: PropTypes.any,
  setOptionValue:  PropTypes.func,
  required: PropTypes.any,
};

export default OrderOptionIcons;
