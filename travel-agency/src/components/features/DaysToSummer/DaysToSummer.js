import React from 'react';
import PropTypes from 'prop-types';
import styles from './DaysToSummer.scss';

class DaysToSummer extends React.Component {
  
  constructor(){ //odświeżanie widoku komponentu co 1 dobę.
    super();
    setInterval(() => {
      this.forceUpdate();
    }, 1000 * 60 * 60 * 24); //1000-sekunda.60*60*24 - doba.
  }

  getCountdownTime(){
  
    const today = new Date();
    const year = today.getUTCFullYear();//teraz wyjdzie rok 2020.
    const summerStart =  new Date(Date.UTC(year, 5, 21, 0, 0, 0, 0));//ustawiam 21 czerwca.
    const summerEnd =  new Date(Date.UTC(year, 8, 23, 0, 0, 0, 0));//ustawiam 23 września.

    if((today >= summerStart && today <= summerEnd) || (today > summerEnd)){//w trakcie lata i po lecie.
      summerStart.setUTCFullYear(summerStart.getUTCFullYear()+1);//ustawiam czerwiec kolejnego roku do odliczania.
      const duringSummer = Math.round((summerStart.getTime() - today.getTime())/(1000*60*60*24));
      return duringSummer;  //days To Countdown During Summer
    } else if (today <= summerStart){ //przed latem
      const beforeSummer = Math.round((summerStart.getTime() - today.getTime())/(1000*60*60*24));
      return beforeSummer;  //days To Countdown Before Summer
    } 
  }

  daysInYear(){
    const today = new Date();
    const year = today.getUTCFullYear();//teraz wyjdzie rok 2020.
    if(year%365 == 0){
      return 365;
    } else {
      return 366;
    }
  }
      
  render(){
    const {title, titleForOneDay} = this.props;
    const countdownTime = this.getCountdownTime();
    const daysInYear = this.daysInYear();
            
    return (
      <div className={styles.component}>
        <div className={styles.title}>          
          {countdownTime == 1 ? countdownTime + titleForOneDay : null
          || countdownTime > (daysInYear - 96) ? null : countdownTime + title
          //Jeśli countdownTime jest większa niż liczba dni bez lata (96-liczba dni lata), 
          //to nic nie ma być wyświetlone. W przeciwnym wypadku, powinna zostać wyświetlona informacja o ilości dni do lata.
          }
        </div> 
      </div>
    );
  }
}

DaysToSummer.propTypes = {
  title: PropTypes.string,
  titleForOneDay: PropTypes.string,
};

export default DaysToSummer;
