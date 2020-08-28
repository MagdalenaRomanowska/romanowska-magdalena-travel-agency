import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';

const newValueSet = (currentValue, id, checked) => { //Kodilla dała.
  if(checked){
    return [
      ...currentValue,//tablica
      id,
    ];
  } else {
    return currentValue.filter(value => value != id);//musimy stworzyć nową tablicę, co robimy za pomocą metody filter.
  }
};
//Skoro currentValue jest tablicą, to w momencie zaznaczenia lub 
//odznaczenia checkboksa musimy zmienić tę tablicę. Jeśli checkbox 
//został zaznaczony, to wystarczy dodać id tej wartości opcji do 
//tablicy (robimy to w bloku if). W przeciwnym wypadku, musimy 
//usunąć to id z tablicy – ale nie możemy jej modyfikować, tylko 
//musimy stworzyć nową tablicę, co robimy za pomocą metody filter 
//w bloku else.

const OrderOptionCheckboxes = ({values, required, setOptionValue, currentValue}) => (
  <div className={styles.checkboxes}>
    {required ? '' : (  //blok kodu, który sprawdza, czy props required jest prawdziwy.
      <option key='null' value=''>
      </option> //Jeśli tak, wstawia pusty ciąg znaków, ale jeśli jest fałszywy (albo nie jest ustawiony), to zostanie wyrenderowany <div>.
      //Wykorzystujemy ten zabieg, ponieważ jeśli w pricing.json opcja ma ustawione "required": true, to powinny być do dyspozycji tylko wartości zdefiniowane w tym pliku. Jeśli jednak opcja nie jest wymagana, chcemy dodać <option>, który pozwoli na brak wyboru, czyli rezygnację z tej opcji.
    )}
    {values.map(value => (
      <label key={value.id}>
        <input 
          value={value.id}
          type='checkbox' 
          onChange={event => setOptionValue(newValueSet(currentValue, value.id, event.currentTarget.checked))}
        />{value.name} -- {value.price}$        
      </label>
    ))}
  </div>
);

OrderOptionCheckboxes.propTypes = {
  values: PropTypes.any,
  required: PropTypes.any,
  currentValue: PropTypes.any,
  setOptionValue: PropTypes.func,
};

export default OrderOptionCheckboxes;
