import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => { 

  //Polecenie: czy generowany jest link do poprawnego adresu, np. '/trip/abc', jeśli props id ma wartość 'abc'.
  it('should render correct link', () => {
    const tripIdik = 'abc'; 
    const component = shallow(<TripSummary id={tripIdik} tags={[]}/>); //dodałam pustą [] bo wywalało błędem.
    const expectedLink = '/trip/abc';
    expect(component.find('.link').prop('to')).toEqual(expectedLink);
  });

  //Polecenie: czy <img> ma poprawne src i alt.
  it('should render correct img src and alt', () => {
    const component = shallow(<TripSummary image='expectedImage' name='expectedName' id='123' tags={[]} />);
    expect(component.find('img').prop('src')).toEqual('expectedImage');
    expect(component.find('img').prop('alt')).toEqual('expectedName');
  });
  
  //Polecenie: czy poprawnie renderują się propsy name, cost i days.
  it('should render correct props: name, cost, days', () => {
    const component = shallow(<TripSummary name='expectedName' days='' cost='' id='123' tags={[]} />);
    expect(component.find('h3').text()).toEqual('expectedName'); //metoda text z dokumentacji enzymejs.github.io
    expect(component.find('span').at(0).text()).toEqual('days'); //
    expect(component.find('span').at(1).text()).toEqual('from');

  });

  //Polecenie: czy jest wywoływany błąd w przypadku braku któregokolwiek z propsów: id, image, name, cost i days.
  it('should throw error without required props', () => { //na podstawie Hero.test.js
    expect(() => shallow(<TripSummary />)).toThrow();
  });
});


// przed metodą expect console.logi robić np. console.log('component.find:', component.find('img').prop('alt'));

{/* <h3 className={styles.title}>{name}</h3>
        <div className={styles.details}>
          <span>{days} days</span>
          <span>from {cost}</span>
        </div> */}