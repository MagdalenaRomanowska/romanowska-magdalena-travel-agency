import React from 'react';
import { shallow } from 'enzyme';
import HappyHourAd from './HappyHourAd';

const select = {
  title: '.title',
  promoDescription: '.promoDescription',
};

const mockProps = { //atrapy propsów.
  title: 'title',
  promoDescription: 'promoDescription',
};

//Test 4: czy komunikat wyświetla odpowiednią liczbę sekund.
const trueDate = Date;// pod koniec testu dla przywrocenia oryg. wartości Date.
const mockDate = customDate => class extends Date { //nowa klasa mockDate (jest funkcją, która zwraca klasę) - działa dokladnie tak samo jak Date. Można zdefiniować anonimową klasę i przypisać ją do zmiennej lub stałej. Dzięki temu dbamy o zakres zmiennych – nasza klasa mockDate ma istnieć tylko w tym bloku describe.
  constructor(...args) {
    if(args.length){// jeśli podano jakieś argumenty, to zostanie wywołany konstruktor Date (czyli super) z tymi argumentami.
      super(...args);
    } else { //gdy nie podano żadnych argumentów, klasa mockDate podaje tą samą godzinę wpisaną na sztywno.
      super(customDate);
    }
    return this;
  }
  static now(){ //W bardzo podobny sposób możemy dodać metodę now. Będzie to metoda statyczna (static), co oznacza, że nie będziemy jej wywoływać na instancji klasy mockDate, ale na tej klasie samej w sobie. Innymi słowy, będzie wywoływana jako mockDate.now().
    return (new Date(customDate)).getTime();
  }
};
//Skoro nie chcemy się powtarzać, to cały test it możemy również zamknąć w funkcji!
const checkDescriptionAtTime = (time, expectedDescription) => {//checkDescriptionAtTime zawiera definicję testu, wykorzystującego funkcję mockDate do tymczasowej podmiany Date na klasę, która będzie zawsze zwracała tę samą wartość (dla pojedynczego testu).
  it(`should show correct at ${time}`, () => {
    global.Date = mockDate(`2019-05-14T${time}.135Z`);
    const component = shallow(<HappyHourAd {...mockProps} />);
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};

afterAll(() => { //z dok. Jesta: Runs a function after all the tests in this file have completed.
  describe('Component HappyHourAd with mocked Date', () => {
    checkDescriptionAtTime('11:57:58', '122');
    checkDescriptionAtTime('11:59:59', '1');
    checkDescriptionAtTime('13:00:00', 23 * 60 * 60 + '');// pusty ciąg znaków, aby skonwertować liczbę na tekst.
  }); 
});

//Test 5: czy odliczanie co sekundę zmniejsza wyświetlaną liczbę.
const checkDescriptionAfterTime = (time, delaySeconds, expectedDescription) => {
  it(`should show correct value ${delaySeconds} seconds after ${time}`, () => {
    jest.useFakeTimers(); //Pozwala ona symulować przebieg czasu, m.in. w setTimeout oraz setInterval. Komponentowi będzie się wydawało, że faktycznie minęły dwie sekundy, podczas gdy w rzeczywistości minie raptem kilka milisekund.
    global.Date = mockDate(`2019-05-14T${time}.135Z`);
    const component = shallow(<HappyHourAd {...mockProps} />);
    const newTime = new Date(); //Pierwsze trzy linie tego fragmentu są odpowiedzialne za ustawienie nowej metody Date. Najpierw pobieramy "aktualną" datę i godzinę – pamiętamy jednak, że wcześniej podmieniliśmy Date na klasę, która zawsze zwróci nam tę samą godzinę. W drugiej linii modyfikujemy tę godzinę, dodając do niej wartość argumentu delaySeconds, a następnie podmieniamy Date na nowy mock ze zmienioną godziną. Dzięki temu od teraz Date będzie zwracał czas późniejszy o tyle sekund, ile podaliśmy w argumencie delaySeconds.
    newTime.setSeconds(newTime.getSeconds() + delaySeconds);
    global.Date = mockDate(newTime.getTime());
    jest.advanceTimersByTime(delaySeconds * 1000); 
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);
    global.Date = trueDate;
    jest.useRealTimers();
  });
};
describe('Component HappyHourAd with mocked Date and delay', () => {
  checkDescriptionAfterTime('11:57:58', 2, '120'); //środkowa wartość to delay - opóźnienie.
  checkDescriptionAfterTime('11:59:58', 1, '1');
  checkDescriptionAfterTime('13:00:00', 60 * 60, 22 * 60 * 60 + '');
});
