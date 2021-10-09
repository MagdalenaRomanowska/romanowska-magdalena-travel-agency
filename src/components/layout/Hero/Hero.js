import React from 'react';
import styles from './Hero.scss';
import PropTypes from 'prop-types';
import HappyHourAd from '../../features/HappyHourAd/HappyHourAd';
import DaysToSummer from '../../features/DaysToSummer/DaysToSummer';

const Hero = ({variant = '', titleText, imageSrc, ...otherProps}) => (
  <div {...otherProps} className={styles.component + variant.split(' ').map(name => ' ' + (styles[name] || name)).join('')}>
    <div className={styles.daysToSummer}><DaysToSummer title=' days to summer!' titleForOneDay=' day to summer!' /></div>
    <h2 className={styles.title}>{titleText}</h2>
    <div className={styles.happyHour}><HappyHourAd title='HAPPY HOUR' promoDescription='It is your time! Take advantage of Happy Hour! All offers 20% off!' /></div>
    <img className={styles.image}  src={imageSrc} />
  </div>
);

Hero.propTypes = {
  variant: PropTypes.string,
  titleText: PropTypes.node.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

export default Hero;