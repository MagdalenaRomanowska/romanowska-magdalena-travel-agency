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

//Pierwsza linia importuje plik formatTime – zamiast import stosujemy jest.requireActual, aby upewnić się, że importujemy faktyczny kod tego pliku, a nie jego zmockowaną wersję.
// Następnie zmieniamy znajdującą się w nim funkcję formatTime na mock funkcji, który zawsze zwróci argument przekazany tej funkcji.
//Dzięki temu, kiedy w naszym komponencie wykonujemy funkcję formatTime z jakimś argumentem, to po prostu zwróci ona otrzymany argument. 
beforeAll(() => { //wykonuje operacje przed wszystkimi testami w tym describe.
  const utilsModule = jest.requireActual('../../../utils/formatTime.js');
  utilsModule.formatTime = jest.fn(seconds => seconds);
});
  
describe('Component HappyHourAd', () => {
  it('should render without crashing', () => {
    const component = shallow(<HappyHourAd />);
    expect(component).toBeTruthy();
  });

  it('should render heading and description', () => {
    const component = shallow(<HappyHourAd />);
    expect(component.exists(select.title)).toEqual(true);
    expect(component.exists(select.promoDescription)).toEqual(true);
  });

  it('should render correct props title', () => {
    const component = shallow(<HappyHourAd {...mockProps} />);
    expect(component.find('h3').text()).toEqual('title'); //metoda text z dokumentacji enzymejs.github.io
  });
});

//Musimy sprawdzić, czy komponent potrafi ustalić na samym początku, ile czasu pozostało 
//do rozpoczęcia promocji. Jednak ten test może być przeprowadzony tylko wtedy, kiedy 
//promocja nie jest aktywna. Inaczej test nie będzie miał sensu, ponieważ zamiast liczby 
//sekund pokazywana byłaby informacja o promocji. Co więcej, nasz test musi znać poprawną 
//odpowiedź, czyli poprawną liczbę, która powinna być wyświetlana! I co teraz? 
//Przecież test może być wykonywany o różnych godzinach i za każdym razem 
//poprawna liczba byłaby inna. Możemy podmienić funkcję, której nasz komponent użyje do 
//sprawdzenia aktualnej godziny. Dzięki temu komponent będzie myślał, że jest zawsze ta 
//sama godzina – nie zważając kompletnie na stan faktyczny.

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
//Skoro nie chcemy się powtarzać, to cały test it możemy również zamknąć w funkcji! Będzie ona potrzebowała tylko dwóch argumentów – czasu i oczekiwanej wartości.
const checkDescriptionAtTime = (time, expectedDescription) => {//checkDescriptionAtTime zawiera definicję testu, wykorzystującego funkcję mockDate do tymczasowej podmiany Date na klasę, która będzie zawsze zwracała tę samą wartość (dla pojedynczego testu).
  it(`should show correct at ${time}`, () => {
    global.Date = mockDate(`2019-05-14T${time}.135Z`);// format zapisu daty i godziny: ISO 8601.
  
    const component = shallow(<HappyHourAd {...mockProps} />);
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);
  
    global.Date = trueDate;
  });
};
afterAll(() => { //z dok. Jesta: wykonuje operacje po wszystkich testach w tym describe.
  describe('Component HappyHourAd with mocked Date', () => {
    checkDescriptionAtTime('11:57:58', '122');
    checkDescriptionAtTime('11:59:59', '1');
    checkDescriptionAtTime('13:00:00', 23 * 60 * 60 + '');//liczbę godzin (23 godziny od 13:00 do 12:00) przemnożyliśmy przez 60 (liczba minut w godzinie) i ponownie przez 60 (liczba sekund w minucie). Na końcu dodaliśmy pusty ciąg znaków, aby skonwertować liczbę na tekst.
  }); 
});
//Nasze testy jednostkowe nie są uruchamiane w przeglądarce, tylko w NodeJS – silniku JS, który jest uruchamiany bez przeglądarki. W NodeJS nie ma obiektu window, ale zamiast niego wszystkie globalne metody i klasy znajdują się w obiekcie global. Dlatego chcąc podmienić klasę Date, korzystamy z global.Date.
//Ten sposób ma jednak dla nas poważny problem – klasa Date zostanie zmieniona na stałe. Oznacza to, że nie będziemy mogli w kolejnych testach używać prawdziwej klasy Date, która zwraca aktualną datę i godzinę. Dlatego wewnątrz testu, który za moment napiszemy, będziemy najpierw podmieniać Date na mockDate, a potem przywracać oryginalną wartość Date, którą zapiszemy w stałej trueDate.

//Test 5: czy odliczanie co sekundę zmniejsza wyświetlaną liczbę.
//To może być nieco mylące, że kontrolujemy dwa rodzaje czasu, więc podsumujmy jeszcze raz:
//- Klasa Date odpowiedzialna jest za sprawdzenie aktualnego czasu (lub zdefiniowanego przez nas, udającego aktualny czas).
//- Timery, kontrolowane przez useFakeTimers i advanceTimersByTime, wpływają na to, kiedy zostanie wykonana funkcja przekazana do setTimeout lub setInterval.
//Te dwa rodzaje czasu działają niezależnie od siebie, i dlatego potrzebujemy kontrolować je osobno. Możesz to sobie wyobrazić jako zegarek i stoper.
const checkDescriptionAfterTime = (time, delaySeconds, expectedDescription) => {
  it(`should show correct value ${delaySeconds} seconds after ${time}`, () => {
    jest.useFakeTimers(); //Pozwala ona symulować przebieg czasu, m.in. w setTimeout oraz setInterval. Komponentowi będzie się wydawało, że faktycznie minęły dwie sekundy, podczas gdy w rzeczywistości minie raptem kilka milisekund.
    global.Date = mockDate(`2019-05-14T${time}.135Z`);
    
    const component = shallow(<HappyHourAd {...mockProps} />);

    const newTime = new Date(); //Pierwsze trzy linie tego fragmentu są odpowiedzialne za ustawienie nowej metody Date. Najpierw pobieramy "aktualną" datę i godzinę – pamiętamy jednak, że wcześniej podmieniliśmy Date na klasę, która zawsze zwróci nam tę samą godzinę. W drugiej linii modyfikujemy tę godzinę, dodając do niej wartość argumentu delaySeconds, a następnie podmieniamy Date na nowy mock ze zmienioną godziną. Dzięki temu od teraz Date będzie zwracał czas późniejszy o tyle sekund, ile podaliśmy w argumencie delaySeconds.
    newTime.setSeconds(newTime.getSeconds() + delaySeconds);
    global.Date = mockDate(newTime.getTime());
    
    jest.advanceTimersByTime(delaySeconds * 1000); //Nasz komponent co sekundę sprawdza aktualny czas (za pomocą Date) i na jego podstawie wyświetla odpowiednią wartość. Oznacza to, że co sekundę komponent na nowo się renderuje. Za pomocą metody advanceTimersByTime przyspieszamy bieg czasu właśnie po to, aby wykonało się kolejne odświeżenie komponentu.

    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);
    
    global.Date = trueDate;
    jest.useRealTimers();//Dzięki temu bieg czasu w JSie, wykonywanym pomiędzy tymi liniami, będzie kontrolowany przez Jesta.
    //Musimy pamiętać o posprzątaniu po sobie – dlatego na końcu testu użyliśmy metody useRealTimers, aby wyłączyć timery symulowane przez Jesta i przywrócić JS do normalnego trybu działania.
  });
};
describe('Component HappyHourAd with mocked Date and delay', () => {
  checkDescriptionAfterTime('11:57:58', 2, '120'); //środkowa wartość to delay - opóźnienie.
  checkDescriptionAfterTime('11:59:58', 1, '1');
  checkDescriptionAfterTime('13:00:00', 60 * 60, 22 * 60 * 60 + '');
});

// Test 6: czy komunikat wyświetla informację o promocji przy otwarciu strony.
//Pomiędzy godzinami 12:00:00 i 12:59:59 (włącznie z nimi), zamiast sekund w elemencie .promoDescription powinien pojawiać się tekst z propsa promoDescription.
describe('Component HappyHourAd with mocked Text = promoDescription', () => {
  checkDescriptionAtTime('12:00:00', mockProps.promoDescription);
  checkDescriptionAtTime('12:30:00', mockProps.promoDescription);
  checkDescriptionAtTime('12:59:59', mockProps.promoDescription);
}); 

// Test 7: czy komunikat wyświetla informację o promocji kiedy odliczanie dotarło do zera.
describe('Component HappyHourAd with mocked promoDescription after 12:00:00', () => {
  checkDescriptionAfterTime('11:59:58', 10, mockProps.promoDescription);//środkowa wartość to delay - opóźnienie 10sec., czyli godz. 12:00:08.
});
