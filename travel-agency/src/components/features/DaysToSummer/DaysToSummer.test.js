import React from 'react';
import { shallow } from 'enzyme';
import DaysToSummer from './DaysToSummer';

const select = {
  title: '.title',
};

const mockProps = { //atrapy propsów.
  title: 'title',
  titleForOneDay: 'titleForOneDay',
};

describe('Component DaysToSummer', () => {
  it('should render without crashing', () => {
    const component = shallow(<DaysToSummer />);
    expect(component).toBeTruthy();
  });
});

// Test: czy komunikat wyświetla tekst o treści: (na podstawie Test 4 z HappyHourAd)
// - "x dni" gdzie x to liczba dni do początku lata (w okresie 24 września - 19 czerwca).
// - "1 dzień" (w dniu 20 czerwca).
// - "" w okresie 21 czerwca - 23 września.

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
const checkDescriptionAtDay = (day, expectedDescription) => {//checkDescriptionAtDaysToSummer zawiera definicję testu, wykorzystującego funkcję mockDate do tymczasowej podmiany Date na klasę, która będzie zawsze zwracała tę samą wartość (dla pojedynczego testu).
  it(`should show correct at ${day}`, () => {
    global.Date = mockDate(`${day}T11:57:58.135Z`);// format zapisu daty i godziny: ISO 8601.
  
    const component = shallow(<DaysToSummer {...mockProps} />);
    const renderedTime = component.find(select.title).text();
    expect(renderedTime).toEqual(expectedDescription);
  
    global.Date = trueDate;
  });
};

describe('Component DaysToSummer with mocked Date', () => {
  checkDescriptionAtDay('2021-06-10', '11' + mockProps.title); //kilka dni do lata.
  checkDescriptionAtDay('2021-06-19', '2' + mockProps.title); //2 dni do lata.
  checkDescriptionAtDay('2021-06-20', '1' + mockProps.titleForOneDay); //1 dzień przed latem.
  checkDescriptionAtDay('2021-06-21', ''); //lato.
  checkDescriptionAtDay('2021-09-23', ''); //lato.
  checkDescriptionAtDay('2021-09-25', '269' + mockProps.title); //2 dni po lecie.
  checkDescriptionAtDay('2023-09-25', '270' + mockProps.title); //2 dni po lecie. Rok przestępny.
}); 

// Test: czy odliczanie co dobę zmniejsza wyświetlaną liczbę (na podstawie Test 5 z HappyHourAd).
const checkDescriptionAfterDay = (day, delayDays, expectedDescription) => {
  it(`should show correct value ${delayDays} days after ${day}`, () => {
    jest.useFakeTimers(); //Pozwala ona symulować przebieg czasu, m.in. w setTimeout oraz setInterval. Komponentowi będzie się wydawało, że faktycznie minęły dwie sekundy, podczas gdy w rzeczywistości minie raptem kilka milisekund.
    global.Date = mockDate(`${day}T11:57:58.135Z`);
    
    const component = shallow(<DaysToSummer {...mockProps} />);

    const newTime = new Date(); //Pierwsze trzy linie tego fragmentu są odpowiedzialne za ustawienie nowej metody Date. Najpierw pobieramy "aktualną" datę i godzinę – pamiętamy jednak, że wcześniej podmieniliśmy Date na klasę, która zawsze zwróci nam tę samą godzinę. W drugiej linii modyfikujemy tę godzinę, dodając do niej wartość argumentu delaySeconds, a następnie podmieniamy Date na nowy mock ze zmienioną godziną. Dzięki temu od teraz Date będzie zwracał czas późniejszy o tyle sekund, ile podaliśmy w argumencie delaySeconds.
    newTime.setDate(newTime.getDate() + delayDays);
    global.Date = mockDate(newTime.getTime());
    
    jest.advanceTimersByTime(delayDays * 1000 *60 * 60 * 24); //Nasz komponent co sekundę sprawdza aktualny czas (za pomocą Date) i na jego podstawie wyświetla odpowiednią wartość. Oznacza to, że co sekundę komponent na nowo się renderuje. Za pomocą metody advanceTimersByTime przyspieszamy bieg czasu właśnie po to, aby wykonało się kolejne odświeżenie komponentu.

    const renderedTime = component.find(select.title).text();
    expect(renderedTime).toEqual(expectedDescription);
    
    global.Date = trueDate;
    jest.useRealTimers();//Dzięki temu bieg czasu w JSie, wykonywanym pomiędzy tymi liniami, będzie kontrolowany przez Jesta.
    //Musimy pamiętać o posprzątaniu po sobie – dlatego na końcu testu użyliśmy metody useRealTimers, aby wyłączyć timery symulowane przez Jesta i przywrócić JS do normalnego trybu działania.
  });
};
describe('Component DaysToSummer with mocked day and delay', () => {
  checkDescriptionAfterDay('2021-06-18', 2, '1' + mockProps.titleForOneDay); //środkowa wartość to delay - opóźnienie. 1 day to summer.
  checkDescriptionAfterDay('2021-06-18', 1, '2' + mockProps.title); //2 days to Summer.
  checkDescriptionAfterDay('2021-06-21', 1, ''); //it`s Summer = null.
  checkDescriptionAfterDay('2023-09-24', 1, '270' + mockProps.title); //270 days to Summer. Rok przestępny.
  checkDescriptionAfterDay('2022-09-24', 1, '269' + mockProps.title); //269 days to Summer.
});

// Test: czy komunikat jest pusty kiedy odliczanie dotarło do zera (na podstawie Test 7 z HappyHourAd).
describe('Component DaysToSummer is empty during Summer', () => {
  checkDescriptionAfterDay('2021-06-21', 10, '');//środkowa wartość to delay - opóźnienie 10 dni.
});