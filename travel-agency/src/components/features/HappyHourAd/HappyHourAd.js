import React from 'react';
import PropTypes from 'prop-types';
import styles from './HappyHourAd.scss';
import {formatTime} from '../../../utils/formatTime';

class HappyHourAd extends React.Component {
  
  constructor(){ //odświeżanie widoku komponentu co sekundę.
    super();
    setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  getCountdownTime(){
    //Obliczenie ilości sekund do najbliższego południa może wydawać Ci się bardzo żmudnym zadaniem, ale wcale nie będzie takie trudne. Pewnym wyzwaniem może być jednak poradzenie sobie ze strefami czasowymi. Należy bardzo uważać na wykorzystywane metody klasy Date, aby nie pomylić czasu UTC z czasem w lokalnej strefie czasowej użytkownika. Całe szczęście, klasa Date ma wbudowane metody, takie jak Date.UTC czy getUTCHours, które pozwalają nam operować na czasie UTC. Obiekt Date zajmie się też konwersją czasu lokalnego na UTC. Dlatego najwygodniej będzie nam stworzyć dwie stałe zawierające instancje Date. Jedna z nich będzie wskazywała aktualny czas, a druga – najbliższą godzinę 12:00.
    const currentTime = new Date();
    const nextNoon = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), 12, 0, 0, 0));
    if(currentTime.getUTCHours() >= 12){
      nextNoon.setUTCDate(currentTime.getUTCDate()+1);
    }
    return Math.round((nextNoon.getTime() - currentTime.getTime())/1000);
  }
      
  render(){
    const {title, promoDescription} = this.props;
    const countdownTime = this.getCountdownTime();
    
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.promoDescription}>            
          {countdownTime > 23*60*60 ? promoDescription : formatTime(countdownTime)
          //Jeśli countdownTime jest większa niż równowartość 23 godzin, to ma zostać wyświetlona informacja o promocji (przekazywana w propsie). W przeciwnym wypadku, powinna zostać wyświetlona wartość tej stałej, co da taki sam efekt, jak do tej pory.
          }
        </div> 
      </div>
    );
  }
}

HappyHourAd.propTypes = {
  title: PropTypes.string,
  promoDescription: PropTypes.string,
};

export default HappyHourAd;
