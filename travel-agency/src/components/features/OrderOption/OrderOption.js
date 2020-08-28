import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import OrderOptionDropdown from './OrderOptionDropdown';
import OrderOptionIcons from './OrderOptionIcons';
import OrderOptionNumber from './OrderOptionNumber';
import OrderOptionCheckboxes from './OrderOptionCheckboxes';
import OrderOptionText from './OrderOptionText';
import OrderOptionDate from './OrderOptionDate';

const optionTypes = { //Kluczami tego obiektu są typy opcji, a wartościami – komponenty, które im odpowiadają.
  dropdown: OrderOptionDropdown,
  icons: OrderOptionIcons,
  checkboxes: OrderOptionCheckboxes,
  number: OrderOptionNumber,
  text: OrderOptionText,
  date: OrderOptionDate,
};

const OrderOption = ({id, setOrderOption, name, type, ...otherProps}) => {
  const OptionComponent = optionTypes[type];//Wartością stałej OptionComponent będzie jeden z komponentów z obiektu optionTypes.
  //Wykorzystujemy go w kodzie JSX i przekazujemy mu wszystkie propsy otrzymane przez OrderOption, poza name i type. 
  if(!OptionComponent){ //Gdyby z jakiegokolwiek powodu w pricing.json znalazła się opcja typu, który nie jest obsługiwany przez nasz kod, komponent OrderOption zwróci null, czyli niczego nie będzie renderował na stronie.
    return null;
  } else {
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{name}</h3>
        <OptionComponent
          {...otherProps} setOptionValue={value => setOrderOption({[id]: value})}
        //funkcja strzałkowa, która wywołuje funkcję setOrderOption, przekazując jej obiekt. W tym obiekcie jest jedna właściwość, której kluczem będzie zawartość zmiennej (a w tym wypadku – propsa) id, a wartością – argument funkcji strzałkowej.
        />
      </div>
    );
  }
};

OrderOption.propTypes = {
  name: PropTypes.string,
};

export default OrderOption;
