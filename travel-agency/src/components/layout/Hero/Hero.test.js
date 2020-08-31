import React from 'react';
import {shallow} from 'enzyme';
import Hero from './Hero';

describe('Component Hero', () => { 

  it('should render without crashing', () => {
    const component = shallow(<Hero titleText='Lorem ipsum' imageSrc='anyContent' />);
    expect(component).toBeTruthy();
    console.log(component.debug());
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<Hero />)).toThrow();
  });

  it('should render correct title and image', () => {
    const expectedTitle = 'Lorem ipsum';
    const expectedImage = 'image.jpg';
    const component = shallow(<Hero titleText={expectedTitle} imageSrc={expectedImage} />);
  
    const renderedTitle = component.find('.title').text();
    expect(renderedTitle).toEqual(expectedTitle);
    expect(component.find('.image').prop('src')).toEqual(expectedImage);
  });

  it('renders correct classNames', () => {
    const mockVariants = 'small dummy';
    const component = shallow(<Hero titleText='Lorem' imageSrc='image.jpg' variant={mockVariants} />);
    expect(component.hasClass('component')).toBe(true);
    expect(component.hasClass('small')).toBe(true);
    expect(component.hasClass('dummy')).toBe(true);
  });

});


// Tutaj robimy tzw. unit testing = test jednostkowy.

//funkcja describe będzie służyła do zgrupowania kilku testów.
//Tej grupie nadajemy opis "Component Hero" w pierwszym argumencie. 
//Drugim argumentem jest funkcja strzałkowa, której zawartość będzie zawierała poszczególne testy.

//Funkcja it służy do zdefiniowania pojedynczego testu, którego opis znajduje się 
//w pierwszym argumencie – "should render without crashing". 
//Drugim argumentem, podobnie jak w describe, jest funkcja strzałkowa, zawierająca wyrażenia testowe.
//Kod testu składa się z dwóch linijek:
// 1. W stałej component zapisujemy wynik funkcji shallow, która renderuje dla nas ten komponent,
// 2. Funkcja expect pozwala na sprawdzenie, czy otrzymany wynik (czyli wyrenderowany komponent) 
//jest prawdziwy.

//Składnia testów specjalnie została tak zaprojektowana, aby była zbliżona do zdań w języku angielskim. 
//Funkcja expect służy do tego, aby porównywać podany jej argument z oczekiwanym wynikiem. 
//Przykładowo, w naszym teście, za pomocą toBeTruthy sprawdzamy, czy komponent zwraca jakąś 
//prawdziwą wartość (fałszywe byłyby np. undefined czy 0). W dokumentacji znajdziesz wszystkie 
//metody, które można wykorzystać na wyniku tej funkcji, podobnie jak toBeTruthy.

// expect(() => shallow(<Hero />)).toThrow(); - Stosujemy tutaj funkcję strzałkową, aby funkcja 
//expect mogła bez zwracania błędu wykonać kod shallow(<Hero />), który powinien zwrócić błąd.
// czyli to że jest błąd bo bez propsów to jest dobrze, bo przechodzi test,

//Sprawdzamy, czy tytuł przekazany w propsie titleText faktycznie jest wyświetlany na stronie.
//W 3-cim teście. Tutaj nowością są metody .find i .text, które podobnie jak shallow, dostarczane 
//są w pakiecie Enzyme. W jego dokumentacji znajdziesz dużo więcej metod, które pozwolą zarówno 
//na wyszukiwanie elementów i trawersowanie symulowanego drzewa DOM, jak i sprawdzanie informacji 
//w wyrenderowanych elementach.

//Zwróć uwagę, że używamy tutaj selektora .title, podczas gdy w Hero.js znajduje się 
//className={styles.title}. Jak zapewne pamiętasz, w kodzie strony to wyrażenie jest zamieniane 
//na tekst w stylu Hero_title_19wwZ, ale przy testowaniu za pomocą Jesta będzie zamienione na title. 
//Dzięki temu możemy używać selektorów analogicznych do tych z naszego kodu SCSS.

//w 3-cim teście zamiast tworzyć stałą renderedImage, bezpośrednio w funkcji expect wpisaliśmy 
//wyrażenie, które znajduje element z klasą image i sprawdza jego props src.

//W 4-tym teście nie sprawdzamy propsów titleText i imageSrc, więc podaliśmy im przykładowe wartości. 
//W funkcjach expect wykorzystaliśmy tym razem metodę hasClass, którą również znajdziesz 
//w dokumentacji Enzyme.

//Funkcja shallow - renderuje komponent, który podajemy jako jej argument. Jest to jednak duży skrót 
//myślowy – przecież w czasie testów strona nie wyświetla się w przeglądarce, więc niby gdzie 
//renderuje się ten komponent? Enzyme zawiera bibliotekę JSDOM, która symuluje drzewo DOM 
//tworzone przez przeglądarkę. Pozwala nam to na niby-renderowanie komponentów do kodu JSX. 
//W terminalu jest className zamiast class. Po tym możemy poznać, że jest to kod JSX, a nie HTML!
//Funkcja shallow renderuje tylko komponent, który jej przekazujemy, bez renderowania komponentów 
//zawartych w nim. Gdybyśmy potrzebowali wyrenderować wszystkie komponenty zawarte w testowanym 
//komponencie, możemy użyć funkcji mount zamiast shallow – jednak w ramach tego modułu nie będziemy 
//mieć takiej potrzeby. Ta funkcja ma większe zastosowanie w testach integracyjnych, a my zajmujemy 
//się testami jednostkowymi.
