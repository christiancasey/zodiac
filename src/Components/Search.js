import React from 'react';
import { BsKeyboardFill } from "react-icons/bs";
// import { CSSTransition } from 'react-transition-group';

import styles from './Lemma.module.css';

import Keyboards from './Keyboards';

const Search = props => {
  
  const keyboardClick = e => {
    props.setKeyboard(prevKeyboard => !prevKeyboard);
  };
  
  return (
    <>
      <h1>Search</h1>
      <input
        className={styles.inputSearch}
        type="text"
        placeholder="lemma..."
        onChange={e => props.updateSearch(e.target.value)}
        value={props.value}
      />
      <button
        className={styles.searchKeyboard}
        onClick={() => keyboardClick()}
      >
        <BsKeyboardFill />
      </button>
      <p>&nbsp;</p>
      <div className={props.keyboard ? styles.fadeIn : styles.fadeOut }>
        <Keyboards visible={props.keyboard} keyboardClick={keyboardClick} keyClick={props.keyClick} />
      </div>
    </>
  );
};

export default Search;