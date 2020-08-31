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
  //   it('should render correct props: name, cost, days', () => {
  //     const component = shallow(<TripSummary name='expectedName' days='11111' cost='99999' id='123' tags={[]} />);
  //     expect(component.find('h3').text()).toEqual('expectedName'); //metoda text z dokumentacji enzymejs.github.io
  //     expect(component.find('h3').text()).toEqual('expectedDays');
  //     expect(component.find('h3').text()).toEqual('expectedCost');
  //   });

});


// przed metodą expect console.logi robić np. console.log('component.find:', component.find('img').prop('alt'));

{/* <h3 className={styles.title}>{name}</h3>
        <div className={styles.details}>
          <span>{days} days</span>
          <span>from {cost}</span>
        </div> */}