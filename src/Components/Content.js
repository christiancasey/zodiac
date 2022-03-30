import React from 'react';

import styles from './Content.module.css';

import LanguageList from './LanguageList';
import Lemmata from './Lemmata';
import Lemma from './Lemma';

////////////////////////////////////////////////////////////////////////////////
// FAKE DATA LOADING STUFF
import DATA from '../Data/sample-data.json';

const Sidebar = props => {
  return (
    <div className={styles.sidebar}>
      <LanguageList
        languages={props.languages}
        selectLanguage={props.selectLanguage}
      />
      <Lemmata
        lemmata={props.lemmata}
        selectedLemmaIndex={props.selectedLemmaIndex}
        selectNewLemma={props.selectNewLemma}
      />
    </div>
  );
};

// The selected lemma needs to get passed down through something to update 
// while also including the higher-level style
const LemmaContainer = props => {
  // return (
  //   <div key={props.lemma} className={styles.lemma}>
  //     <Lemma key={props.lemma} lemma={props.lemma} />
  //   </div>
  // );
  return (
    <div className={styles.lemma}>
      <Lemma lemma={props.lemma} />
    </div>
  )
};


function loadLemmata() {
  let lemmata = null;
  lemmata = JSON.parse(localStorage.getItem('lemmata'));
  if (!lemmata) {
    localStorage.setItem("lemmata", JSON.stringify(DATA.lemmata));
    lemmata = DATA.lemmata;
  }
  return lemmata || [];
}
// END FAKE DATA LOADING
////////////////////////////////////////////////////////////////////////////////


const ANY_LANGUAGE_LABEL = 'All Languages';


function Content(props) {
  const [lemmata, setLemmata] = React.useState(getLemmata());
  const [languages, setLanguages] = React.useState(getLanguageList(lemmata));
  // const [selectedLemmaIndex, selectLemma] = React.useState(0);
  const [lemma, selectLemma] = React.useState(lemmata[0]);
  
  function getLemmata() {
    // RECREATE THIS FOR WORKING WITH REAL DATA
    // const savedLemmata = JSON.parse(localStorage.getItem('lemmata'));
    // return savedLemmata || [];
    return loadLemmata(); // DELETE THIS WHEN REAL DATA
  }
  
  function getLanguageList(lemmata) {
    
    // Create a list of languages present in the dataset
    let languageNames = [];
    lemmata.map(lemma => {
      if (!languageNames.includes(lemma.language))
        languageNames.push(lemma.language);
    });
    
    // Sort list alphabetically (before assigning ids!)
    // NB this sorts in reverse order now to show a result
    languageNames.sort((a,b) => (a.name < b.name ? 1 : -1));
    
    // Flesh out the list of language names as proper objects for later use
    let languages = languageNames.map((language, i) => {
      return {
        id: i,
        name: language,
        active: true,
      }
    });
    
    return languages;
  }
  
  function selectLanguage(languageId) {
    setLanguages(prevLanguages => languages.map(language => {
      if (language.id == languageId)
        return {
          ...language,
          active: !language.active,
        };
      return language;
    }));
  }
  
  function selectNewLemma(lemmaIndex) {
    selectLemma(lemmata[lemmaIndex]);
  }
  
  // Filter lemmata using language list
  // Keep a lemma in the filtered list iff:
  // 1. its language is in the list of languages (which must be true by definition)
  // 2. that language is currently active
  const lemmataFiltered = lemmata.filter(lemma => 
    languages.some(language => 
      (language.active && language.name == lemma.language)
    ));
  
  return (
    <div className={styles.content}>
      <Sidebar
        languages={languages}
        selectLanguage={selectLanguage}
      
        lemmata={lemmataFiltered}
        selectNewLemma={selectNewLemma}
      />
      <LemmaContainer lemma={lemma} />
    </div>
  );
};

export default Content;