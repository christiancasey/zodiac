import React from 'react';
import { v4 as uuidv4 } from "uuid";

import styles from './Content.module.css';

import Sidebar from './Sidebar';
import Lemma from './Lemma';

import searchLemmata from './searchLemmata';

////////////////////////////////////////////////////////////////////////////////
// FAKE DATA LOADING STUFF

import DATA from '../Data/sample-data.json';

function loadLemmata() {
  let lemmata = null;
  lemmata = JSON.parse(localStorage.getItem('lemmata') || null);
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

const Content = props => {
  const [lemmata, setLemmata] = React.useState(loadLemmata());
  const [lemmataSortField, setLemmataSortField] = React.useState('translation');
  const [languages, setLanguages] = React.useState(getLanguageList(lemmata));
  const [lemma, selectLemma] = React.useState(null);//lemmata[0]);
  const [search, updateSearch] = React.useState('');
  const [changed, setChanged] = React.useState(false);
  const [keyboard, setKeyboard] = React.useState(false);
  
  function getLanguageList(lemmata) {
    // Load the language list from local storage to keep checkbox settings
    let languages = null;
    languages = JSON.parse(localStorage.getItem('languageList') || null);

    if (!languages) {
      // Flesh out the list of language names as proper objects for later use
      languages = languageOptions.map(language => {
        return {
          id: language.id,
          label: language.label,
          value: language.value,
          active: true,
        }
      });
      localStorage.setItem('languageList', JSON.stringify(languages));
    }
    return languages;
  }
  
  function selectLanguage(languageId) {
    let newLanguages = languages.map(language => {
      if (language.id === languageId)
        return {
          ...language,
          active: !language.active,
        };
      return language;
    });
    localStorage.setItem('languageList', JSON.stringify(newLanguages));
    setLanguages(newLanguages);
  }
  
  function selectNewLemma(lemmaId) {

    // Selecting should simply do nothing if the lemma clicked is already displayed
    // The Lemma component doesn't update when the same lemma is selected again
    // Ignoring the click prevents the save-state from becoming invalid if there are changes
    // Otherwise, clicking the same lemma marks it as unchanged, even when that's not true
    // First make sure lemma is not null (as on startup) before checking its ID
    if (lemma && lemma.lemmaId === lemmaId)
      return;
    
    setChanged(false);
    setKeyboard(false);
    
    selectLemma(lemmata.find(lemma => lemma.lemmaId === lemmaId));
    
    // props.history.replace({ pathname: `/product/${lemmaId}`})
    // window.history.replaceState(null, "New Page Title", lemmaId);
  }
  
  function saveLemma(newLemma) {
    setChanged(false);
    
    const newLemmata = lemmata.map(lemma => {
      if (lemma.lemmaId === newLemma.lemmaId) {
        return newLemma;
      }
      return lemma;
    })
    setLemmata(newLemmata);
    
    // REPLACE WITH A PROPER LAMBDA FUNCTION CALL
    localStorage.setItem("lemmata", JSON.stringify(newLemmata));
    
  }
  
  const addNewLemma = () => {
    const newLemma = {
      lemmaId: uuidv4(),
      published: false,
      translation: '?',
      language: 'akkadian',
      original: '?',
      transliteration: '?',
      partOfSpeech: 'noun',
      meanings: [],
      variants: [],
      quotations: [],
    };
    setLemmata(prevLemmata => {
      return [...lemmata, newLemma];
    });
    selectLemma(newLemma);
    setKeyboard(false);
    setChanged(true);
    
    // Remove the search filter and make sure Akkadian is checked so that the new lemma always appears in the list
    updateSearch('');
    setLanguages(languages.map(language => {
      if (language.id === 1) {
        language.active = true;
        return language;
      }
      return language;
    }))
  };
  
  const deleteLemma = lemmaId => {
    
    // Don't delete the very last lemma or everything fubars
    if (lemmata.length <= 1)
      return;
    
    const newLemmata = lemmata.filter(lemma => {
      return (lemma.lemmaId !== lemmaId);
    });
    setLemmata(newLemmata);
    selectLemma(null);//newLemmata[0]);
    
    // REPLACE WITH A PROPER LAMBDA FUNCTION CALL
    localStorage.setItem("lemmata", JSON.stringify(newLemmata));
  };
  
  const keyClick = key => {
    if (key === 'delete') {
      // Array conversion needed to deal with two-byte Unicode characters
      updateSearch(prevSearch => Array.from(prevSearch).slice(0, -1).join(''));
    } else {
      updateSearch(prevSearch => prevSearch + key);
    }
  };
  
  const sortLemmata = sortField => {
    setLemmataSortField(sortField);
  };
  
  // Filter lemmata using language list
  // Keep a lemma in the filtered list iff:
  // 1. its language is in the list of languages (which must be true by definition)
  // 2. that language is currently active
  let lemmataFiltered = lemmata.filter(lemma => 
    languages.some(language => (
        language.active 
        && language.value === lemma.language
        && lemma.original !== '?'
      )
    ));
  
  // Use the field set with the 'Sort by' buttons to sort
  lemmataFiltered.sort((a, b) => (a[lemmataSortField] < b[lemmataSortField] ? -1 : 1));
  
  if (search) {
    // Search function stored in separate module: searchLemmata.js
    lemmataFiltered = searchLemmata(lemmataFiltered, search);
  }
  
  return (
    <div className={styles.content}>
      <Sidebar
        updateSearch={updateSearch}
        keyClick={keyClick}
        value={search}
        languages={languages}
        selectLanguage={selectLanguage}
        lemmata={lemmataFiltered}
        sortLemmata={sortLemmata}
        selectNewLemma={selectNewLemma}
        addNewLemma={addNewLemma}
        keyboard={keyboard}
        setKeyboard={setKeyboard}
      />
      <div className={styles.lemma}>
        <Lemma 
          lemma={JSON.stringify(lemma)}
          changed={changed}
          setChanged={setChanged}
          languageOptions={languageOptions}
          partOfSpeechOptions={partOfSpeechOptions}
          saveLemma={saveLemma}
          deleteLemma={deleteLemma}
        />
      </div>
    </div>
  );
};

export default Content;