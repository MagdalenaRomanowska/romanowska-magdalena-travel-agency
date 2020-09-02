import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {

  //Polecenie: czy generowany jest link do poprawnego adresu, np. '/trip/abc', jeśli props id ma wartość 'abc'.
  it('should render correct link', () => {
    const tripIdik = 'abc';
    const component = shallow(<TripSummary id={tripIdik} tags={[]} image='img' name='abc' cost='543' days='123' />); //dodałam pustą [] bo wywalało błędem.
    const expectedLink = '/trip/abc';
    expect(component.find('.link').prop('to')).toEqual(expectedLink);
  });

  //Polecenie: czy <img> ma poprawne src i alt.
  it('should render correct img src and alt', () => {
    const component = shallow(<TripSummary image='expectedImage' name='expectedName' id='123' cost='543' days='123' tags={[]} />);
    expect(component.find('img').prop('src')).toEqual('expectedImage');
    expect(component.find('img').prop('alt')).toEqual('expectedName');
  });

  //Polecenie: czy poprawnie renderują się propsy name, cost i days.
  it('should render correct props: name, cost, days', () => {
    const component = shallow(<TripSummary name='expectedName' image='img' days='123' cost='543' id='123' tags={[]} />);
    expect(component.find('h3').text()).toEqual('expectedName'); //metoda text z dokumentacji enzymejs.github.io
    expect(component.find('span').at(0).text()).toEqual('123 days'); //
    expect(component.find('span').at(1).text()).toEqual('from 543');
  });

  //Polecenie: czy jest wywoływany błąd w przypadku braku któregokolwiek z propsów: id, image, name, cost i days.
  it('should throw error without required props', () => { //na podstawie Hero.test.js
    expect(() => shallow(<TripSummary image='img' name='abc' cost='543' days='123' tags={[]} />)).toThrow();
    expect(() => shallow(<TripSummary id='123' name='abc' cost='543' days='123' tags={[]} />)).toThrow();
    expect(() => shallow(<TripSummary id='123' image='img' cost='543' days='123' tags={[]} />)).toThrow();
    expect(() => shallow(<TripSummary id='123' image='img' name='abc' days='123' tags={[]} />)).toThrow();
    expect(() => shallow(<TripSummary id='123' image='img' name='abc' cost='543' tags={[]} />)).toThrow();
  });

  it('should not render div with class tags when props tags is empty array', () => { //props tags jest pustą tablicą.
    const component = shallow(<TripSummary tags={[]} name='expectedName' image='img' days='123' cost='543' id='123' />);
    expect(component.exists('.tags')).toEqual(false); //podpowiedź: https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/exists.html
  });

  it('should not render div with class tags when props tags doesn`t exist', () => { //po prostu nie podaję tu propsa tags.
    const component = shallow(<TripSummary name='expectedName' image='img' days='123' cost='543' id='123' />);
    expect(component.exists('.tags')).toEqual(false);
  });

  //Polecenie: napisz test, który będzie przekazywał komponentowi trzy tagi, 
  //i sprawdzi, czy są one renderowane w spanach w odpowiedniej kolejności. 
  it('should render correct props order: days, cost, tags', () => {
    const component = shallow(<TripSummary tags={['tag1', 'tag2', 'tag3']} name='expectedName' image='img' days='123' cost='543' id='123' />);
    expect(component.find('span').at(2).text()).toEqual('tag1'); //3ci span w komponencie.
    expect(component.find('span').at(3).text()).toEqual('tag2'); //4ty span w komponencie, z pętli.
    expect(component.find('span').at(4).text()).toEqual('tag3'); //5ty span w komponencie, z pętli.
  });

});
