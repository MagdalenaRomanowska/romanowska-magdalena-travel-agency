import React from 'react';
import { shallow/*, ShallowWrapper*/ } from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption type='abc' name='abcd' />);
    expect(component).toBeTruthy();
    console.log(component.debug());
  });

  it('should return empty object if called without required props', () => {
    //sprawdzimy, czy przy braku podanego typu opcji komponent zachowa się 
    //poprawnie, czyli zwróci null. Osiągniemy to, porównując wyrenderowany 
    //komponent z pustym obiektem.
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  //polecenie: test, który upewni się, że w tytule wyświetla się zawartość propsa name.
  it('should render props name in title', () => {
    const component = shallow(<OrderOption type='icons' name='abcd' />);
    //console.log('Component tested: ', component.debug());//wygląd komponentu, metoda Shallowwrapper, podpowiedź: https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/debug.html
    expect(component.find('.title').text()).toEqual('abcd');
  });
});

const optionTypes = { //z Kodilli kod - typy opcji oraz nazwy odpowiadających im subkomponentów. Następnie w pętli iterujemy po nich, zapisując typ opcji w zmiennej type.
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = { //mock = atrapa z Kodilli. W pliku pricing.json możesz sprawdzić, że tylko niektóre opcje mają właściwość values, a inne limits. My złączyliśmy wszystkie możliwości w jednym obiekcie mockProps, aby ułatwić sobie testowanie. Subkomponenty i tak będą korzystać tylko z niektórych propsów, więc nie musimy się tym przejmować.
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
}; 
  
const mockPropsForType = {//atrapy z Kodilli, zawiera propsy istotne tylko dla konkretnego typu opcji. Na przykład, OrderOptionCheckboxes wymaga, aby currentValue było tablicą, a number – liczbą.
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};
  
const testValue = mockProps.values[1].id; // z Kodilli. Będziemy się starali, aby każdy subkomponent przyjął właśnie tę wartość. 
//Zwróć uwagę, że testValue odwołuje się do id drugiego obiektu w mockProps.values, podczas gdy mockProps.currentValue jest równe id pierwszego obiektu. W ten sposób zasymulujemy sytuację, w której opcja ma już jakąś wartość, którą chcemy zmienić na inną (lub do której dodamy inną, w przypadku checkboxes).
const testValueNumber = 3; // z Kodilli. Będziemy się starali, aby każdy subkomponent przyjął właśnie tę wartość. 
  

for(let type in optionTypes){ //zapisuję typ opcji w zmiennej type.
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn(); //sposób na stworzenie atrapy funkcji. Jest posiada wbudowany mechanizm do mockowania funkcji, czyli budowania atrapy, która pozwoli nam sprawdzić, czy ta funkcja była wykonana, ile razy, z jakimi argumentami, etc.
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption} 
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);//musieliśmy najpierw w wyrenderowanym komponencie OrderOption znaleźć subkomponent za pomocą metody .find. Jako selektora użyliśmy w tym wypadku po prostu nazwy subkomponentu.
      renderedSubcomponent = subcomponent.dive(); //metoda .dive wyrenderowała subkomponenty.
    });

    /* common tests */ 
    // it('passes dummy test', () => {
    //   //console.log(component.debug());
    //   console.log(subcomponent.debug());
    //   expect(1).toBe(1);
    // });

    it(`renders ${optionTypes[type]}`, () => { //dla każdego subkomponentu sprawdzamy, czy w ogóle się renderuje. 
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => { //czy ten subkomponent zawiera odpowiednie elementy, czyli <select> i <option>.
          // Szybkie spojrzenie do pliku OrderOptionDropdown.js przypomni Ci, że jeśli props required jest fałszywy (a w naszych mockowanych propsach ma wartość false), zostanie dodany dodatkowy <option> z pustą wartością. 
          // Sprawdzimy więc zarówno obecność selecta, opcji z pustą wartością, jak i po jednej opcji dla każdego obiektu z mockProps.values.
          // Zwróć uwagę, że w stałej emptyOption używamy selektora atrybutu, a w stałej options – metody .not. W ten sposób możemy wybrać, które opcje chcemy zapisać w każdej z tych stałych.
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);
          
          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);
          
          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });
        // Aby poprawnie sprawdzić działanie subkomponentu dropdown, musimy zasymulować event change oraz zawartość event.currentTarget, aby sprawdzić, czy wtedy subkomponent w reakcji na ten event wykona funkcję setOptionValue, która wykona setOrderOption.
        
        it('should run setOrderOption function on change', () => {
        // Po znalezieniu selecta, wykonujemy na nim metodę .simulate, która przyjmuje jeden lub dwa argumenty. Pierwszym z nich jest rodzaj eventu, jaki ma zostać zasymulowany – w tym wypadku event change. Drugi argument to wartość przekazywana handlerowi tego eventu. Jak zwykle, handler eventu spodziewa się, że otrzyma obiekt event, ale nie musimy mockować całej jego zawartości – ten handler korzysta tylko z właściwości currentTarget, z której pobiera value. Dlatego właśnie jako drugi argument podaliśmy taką atrapę obiektu event.
        // Przechodząc do kolejnej linii kodu, sprawdzamy, czy ta funkcja została wykonana dokładnie jeden raz. Natomiast w ostatniej linii kodu sprawdzamy, czy została wywołana z poprawnymi argumentami.
        // zasymulować event za pomocą .simulate (podając obiekt oczekiwany przez handler eventu).
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1); // toBeCalledTimes = toHaveBeenCalledTimes z dokumentacji Jest`a. Kodilla użyła aliasów, ponieważ są krótsze i bardziej czytelne.
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue }); // toBeCalledWith = toHaveBeenCalledWith z dokumentacji Jest`a. Kodilla użyła aliasów, ponieważ są krótsze i bardziej czytelne.
        });
        break;
      }

      case 'icons': {
        it('contains divs, icon and option', () => { 
          const divs = renderedSubcomponent.find('div');
          const divWithClassIcon = renderedSubcomponent.find('div.icon'); // jak łączyć w Enzyme element z klasą - podpowiedź: https://enzymejs.github.io/enzyme/docs/api/selector.html
          const divWithClassIconActive = renderedSubcomponent.find('div.iconActive');
          expect(divs.length).toBe(4); //2 divy z komponentu, trzeci div z komponentu 2 razy bo mockowanie po 2 wartościach.
          expect(divWithClassIcon.length).toBe(3);
          expect(divWithClassIconActive.length).toBe(1);

          const emptyOption = divs.find('option[value=""]').length;
          expect(emptyOption).toBe(1);
            
          const icon = renderedSubcomponent.find('Icon');
          expect(icon.length).toBe(3); //1 Icon z komponentu, drugi Icon z komponentu 2 razy bo mockowanie po 2 wartościach.
        });

        it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find('div').at(3).simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1); // toBeCalledTimes = toHaveBeenCalledTimes z dokumentacji Jest`a. Kodilla użyła aliasów, ponieważ są krótsze i bardziej czytelne.
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue }); // toBeCalledWith = toHaveBeenCalledWith z dokumentacji Jest`a. Kodilla użyła aliasów, ponieważ są krótsze i bardziej czytelne.
        });
        break;
      }

      case 'checkboxes': {
        it('contains divs, option, label, input', () => { 
          const divs = renderedSubcomponent.find('div');
          const divWithClassCheckboxes = renderedSubcomponent.find('div.checkboxes'); // jak łączyć w Enzyme element z klasą - podpowiedź: https://enzymejs.github.io/enzyme/docs/api/selector.html
          expect(divWithClassCheckboxes.length).toBe(1);
          
          const emptyOption = divs.find('option[value=""]').length;
          expect(emptyOption).toBe(1);
              
          const label = renderedSubcomponent.find('label');
          expect(label.length).toBe(2); 

          const inputWithTypeCheckbox = renderedSubcomponent.find('input[type="checkbox"]');// podpowiedź z w/w strony Enzyme na przykładzie a[href="foo"]
          expect(inputWithTypeCheckbox.length).toBe(2);
        });
        
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input[value="'+ testValue +'"]').simulate('change', {currentTarget: {checked: true}});
          console.log('input Checkboxes:', renderedSubcomponent.find('input[value="'+ testValue +'"]').debug());
          expect(mockSetOrderOption).toBeCalledTimes(1); 
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] }); 
        });

        break;
      }

      case 'number': {
        it('contains divs, input', () => { 
          const divWithClassNumber = renderedSubcomponent.find('div.number'); // jak łączyć w Enzyme element z klasą - podpowiedź: https://enzymejs.github.io/enzyme/docs/api/selector.html
          expect(divWithClassNumber.length).toBe(1);

          const divWithClassPrice = renderedSubcomponent.find('div.price'); // jak łączyć w Enzyme element z klasą - podpowiedź: https://enzymejs.github.io/enzyme/docs/api/selector.html
          expect(divWithClassPrice.length).toBe(1);

          const inputWithTypeNumber = renderedSubcomponent.find('input[type="number"]');// podpowiedź z w/w strony Enzyme na przykładzie a[href="foo"]
          expect(inputWithTypeNumber.length).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1); 
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber }); 
        });
        break;
      }

      case 'text': {
        it('contains div, input', () => { 
          const divWithClassNumber = renderedSubcomponent.find('div.number'); // jak łączyć w Enzyme element z klasą - podpowiedź: https://enzymejs.github.io/enzyme/docs/api/selector.html
          expect(divWithClassNumber.length).toBe(1);

          const inputWithTypeText = renderedSubcomponent.find('input');// podpowiedź z w/w strony Enzyme na przykładzie a[href="foo"]
          expect(inputWithTypeText.length).toBe(1);
        });

        //NIE PRZECHODZI - czy robić onChange dla inputa w komponencie OrderOptionText? może coś innego?
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1); 
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue }); 
        });
        break;
      }

      case 'date': {
        it('contains datepicker', () => { 
          const datepicker = renderedSubcomponent.find(DatePicker); 
          expect(datepicker.length).toBe(1);
        });

        //NIE PRZECHODZI 
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find(DatePicker).simulate('change', testValue);
          //console.log('DatePicker:', renderedSubcomponent.find(DatePicker).debug());
          expect(mockSetOrderOption).toBeCalledTimes(1); 
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue }); 
        });
        break;
      }
    }
  });
}

// Całe zagadnienie testu interaktywności (submoduł 19.3): wystarczyło stworzyć atrapę funkcji za pomocą jest.fn(), zasymulować event za pomocą .simulate (podając obiekt oczekiwany przez handler eventu), oraz sprawdzić,s co przechwyciła atrapa funkcji za pomocą metod .toBeCalledTimes i .toBeCalledWith.
// I to jest klucz do testów jednostkowych sprawdzających działanie interakcji – symulujemy event i sprawdzamy, czy wykonała się atrapa funkcji, podana w propsach.