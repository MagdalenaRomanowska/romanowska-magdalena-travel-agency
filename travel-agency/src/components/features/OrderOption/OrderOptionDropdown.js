import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import {formatPrice} from '../../../utils/formatPrice';

const OrderOptionDropdown = ({values, required, currentValue, setOptionValue}) => (
  <select
    className={styles.dropdown}
    value={currentValue}
    onChange={event => setOptionValue(event.currentTarget.value)} //do eventu zmiany wartości (onChange) przypisaliśmy funkcję strzałkową. Ta funkcja przyjmuje event jako argument i zwraca wywołanie funkcji setOptionValue, której argumentem jest wartość elementu.
  >{console.log(currentValue)}
    {required ? '' : (  //blok kodu, który sprawdza, czy props required jest prawdziwy.
      <option key='null' value=''>---</option> //Jeśli tak, wstawia pusty ciąg znaków, ale jeśli jest fałszywy (albo nie jest ustawiony), to zostanie wyrenderowany <option> z pustą wartością i tekstem ---.
      //Wykorzystujemy ten zabieg, ponieważ jeśli w pricing.json opcja ma ustawione "required": true, to powinny być do dyspozycji tylko wartości zdefiniowane w tym pliku. Jeśli jednak opcja nie jest wymagana, chcemy dodać <option>, który pozwoli na brak wyboru, czyli rezygnację z tej opcji.
    )}
    {values.map(value => ( //mapowanie po wartościach tej opcji.
      <option key={value.id} value={value.id}>{value.name} ({formatPrice(value.price)})</option>
    // Dla każdej z nich renderujemy <option>, któremu ustawiamy key, value oraz treść. Bardzo ważne, że wartością tego <option> musi być id danej wartości, ponieważ to po nim rozpoznajemy, która opcja jest wybrana.
    ))}
  </select>
);

OrderOptionDropdown.propTypes = {
  values: PropTypes.number,
  required: PropTypes.any,
  currentValue: PropTypes.any,
  setOptionValue:  PropTypes.func,
};

export default OrderOptionDropdown;
