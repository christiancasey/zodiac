import React from 'react';

import styles from './StarHeader.module.css';

import zodiacConstellations from '../Graphics/zodiac_constellations.svg';
import zodiacLogo from '../Graphics/zodiac_logo.svg';

const StarHeader = () => {
  return (
    <>
      <header className={styles.header}>
        <img
          className={styles.starChart}
          src={zodiacConstellations}
          alt="Star chart with zodiac constellations"
        />
        <h1 className={styles.zodiacLogotype}>
          Zodiac
        </h1>
      </header>
      <div className={styles.headerBodyGradient}></div>
      <div className={styles.bodyBackground}></div>
    </>
  );
};

export default StarHeader;

// <img src={zodiacLogo} style={{height: '5vw'}} alt="Zodiac logo"/>