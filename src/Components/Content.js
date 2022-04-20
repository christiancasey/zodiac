import React from 'react';

import styles from './Content.module.css';

import Sidebar from './Sidebar';
import LanguageList from './LanguageList';
import Lemma from './Lemma';



////////////////////////////////////////////////////////////////////////////////
// FAKE DATA LOADING STUFF

import DATA from '../Data/sample-data.json';

function loadLemmata() {
  let lemmata = null;
  lemmata = JSON.parse(localStorage.getItem('lemmata'));
  if (!lemmata) {
    localStorage.setItem("lemmata", JSON.stringify(DATA.lemmata));
    lemmata = DATA.lemmata;
  }
  return lemmata || [];
};

const languageOptions = [
  { id: 1, value: 'akkadian', label: 'Akkadian' },
  { id: 2, value: 'aramaic',  label: 'Aramaic' },
  { id: 3, value: 'egyptian', label: 'Egyptian' },
  { id: 4, value: 'greek',    label: 'Greek' },
  { id: 5, value: 'hebrew',   label: 'Hebrew' },
  { id: 6, value: 'latin',    label: 'Latin' },
];

const partOfSpeechOptions = [
  { id: 1,	value: 'adjective',		 label: 'Adjective'},
  { id: 2,	value: 'adverb',		   label: 'Adverb'},
  { id: 3,	value: 'article',		   label: 'Article'},
  { id: 4,	value: 'conjunction',	 label: 'Conjunction'},
  { id: 5,	value: 'interjection', label: 'Interjection'},
  { id: 6,	value: 'noun',			   label: 'Noun'},
  { id: 7,	value: 'particle',		 label: 'Particle'},
  { id: 8,	value: 'preposition',	 label: 'Preposition'},
  { id: 9,	value: 'pronoun',		   label: 'Pronoun'},
  { id: 10,	value: 'verb',			   label: 'Verb'},
  { id: 11,	value: 'unknown',		   label: '❌ Unknown'},
];

// function loadLanguageOptions() {
//   const languageOptions = [
//     { label: 'Egyptian', value: 'egyptian' },
//     { label: 'Greek', value: 'greek' },
//   ];
// 
//   return languageOptions;
// }
// END FAKE DATA LOADING
////////////////////////////////////////////////////////////////////////////////







function Content(props) {
  const [lemmata, setLemmata] = React.useState(loadLemmata());
  const [languages, setLanguages] = React.useState(getLanguageList(lemmata));
  const [selectedLemmaIndex, selectLemmaIndex] = React.useState(0);
  const [lemma, selectLemma] = React.useState(lemmata[0]);
  
  function getLemmata() {
    // RECREATE THIS FOR WORKING WITH REAL DATA
    // const savedLemmata = JSON.parse(localStorage.getItem('lemmata'));
    // return savedLemmata || [];
    return loadLemmata(); // DELETE THIS WHEN REAL DATA
  }
  
  // const languageOptions = loadLanguageOptions();
  
  function getLanguageList(lemmata) {
    
    // // Create a list of languages present in the dataset
    // let languageNames = [];
    // lemmata.map(lemma => {
    //   if (!languageNames.includes(lemma.language))
    //     languageNames.push(lemma.language);
    // });
    // 
    // // Sort list alphabetically (before assigning ids!)
    // // NB this sorts in reverse order now to show a result
    // languageNames.sort((a,b) => (a.name < b.name ? 1 : -1));
    
    // Flesh out the list of language names as proper objects for later use
    let languages = languageOptions.map((language, i) => {
      return {
        id: language.id,
        label: language.label,
        value: language.value,
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
    selectLemmaIndex(lemmaIndex);
    selectLemma(lemmata[lemmaIndex]);
  }
  
  function saveLemma(newLemma) {
    console.log(newLemma);
    console.log(lemmata);
    
    const newLemmata = lemmata.map(lemma => {
      if (lemma.lemmaId === newLemma.lemmaId) {
        return newLemma;
      }
      return lemma;
    })
    setLemmata(newLemmata);
    
    
    
    localStorage.setItem("lemmata", JSON.stringify(newLemmata));
  }
  
  // Filter lemmata using language list
  // Keep a lemma in the filtered list iff:
  // 1. its language is in the list of languages (which must be true by definition)
  // 2. that language is currently active
  const lemmataFiltered = lemmata.filter(lemma => 
    languages.some(language => 
      (language.active && language.value == lemma.language)
    ));
  
  return (
    <div className={styles.content}>
      <Sidebar
        languages={languages}
        selectLanguage={selectLanguage}
        lemmata={lemmataFiltered}
        selectNewLemma={selectNewLemma}
      />
      
      <div className={styles.lemma}>
        <Lemma 
          lemma={JSON.stringify(lemma)}
          languageOptions={languageOptions}
          partOfSpeechOptions={partOfSpeechOptions}
          saveLemma={saveLemma}
        />
      </div>
    </div>
  );
};

export default Content;