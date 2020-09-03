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

const OrderOption = ({ id, setOrderOption, name, type, ...otherProps }) => {
  const OptionComponent = optionTypes[type];//Wartością stałej OptionComponent będzie jeden z komponentów z obiektu optionTypes.
  //Wykorzystujemy go w kodzie JSX i przekazujemy mu wszystkie propsy otrzymane przez OrderOption, poza name i type. 
  if (!OptionComponent) { //Gdyby z jakiegokolwiek powodu w pricing.json znalazła się opcja typu, który nie jest obsługiwany przez nasz kod, komponent OrderOption zwróci null, czyli niczego nie będzie renderował na stronie.
    return null;
  } else {
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{name}</h3>
        <OptionComponent //ten komponent to tak naprawdę jedna z opcji zamówienia.
          {...otherProps} setOptionValue={value => setOrderOption({ [id]: value })}
        //funkcja strzałkowa, która wywołuje funkcję setOrderOption, przekazując jej obiekt. W tym obiekcie jest jedna właściwość, której kluczem będzie zawartość zmiennej (a w tym wypadku – propsa) id, a wartością – argument funkcji strzałkowej.
        // Komponent OrderOption otrzymuje propsa setOrderOption. Jest to funkcja, która ma otrzymywać obiekt w formacie {idOpcji: wartośćOpcji}. Ten komponent przekazuje subkomponentowi w propsie setOptionValue inną funkcję: value => setOrderOption({[id]: value}).
        // Każdy z subkomponentów na swój sposób wykorzystuje tę funkcję, zawartą w propsie setOptionValue – może uruchamiać ją przy różnych eventach i przekazywać jej różne wartości. W przypadku OrderOptionDropdown będzie to event change, a wartością będzie właściwość value obiektu zapisanego w event.currentTarget.
        />
      </div>
    );
  }
};

OrderOption.propTypes = {
  name: PropTypes.string,
  type: PropTypes.any,
};

export default OrderOption;
