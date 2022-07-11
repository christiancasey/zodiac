import React from 'react';
import styles from './Content.module.css';
import { IoIosAddCircle } from "react-icons/io";

import Search from './Search';
import LanguageList from './LanguageList';
import Lemmata from './Lemmata';

const Sidebar = props => {
  return (
    <div className={styles.sidebar}>
      <Search 
        updateSearch={props.updateSearch}
        keyClick={props.keyClick}
        value={props.value}
        keyboard={props.keyboard}
        setKeyboard={props.setKeyboard}
      />
      <LanguageList
        languages={props.languages}
        selectLanguage={props.selectLanguage}
      />
      <Lemmata
        lemmata={props.lemmata}
        selectedLemmaIndex={props.selectedLemmaIndex}
        selectNewLemma={props.selectNewLemma}
        sortLemmata={props.sortLemmata}
      />
      <div>
        <button className={styles.addNewLemma} onClick={props.addNewLemma}><IoIosAddCircle /> Add new lemma...</button>
      </div>
    </div>
  );
};

export default Sidebar;