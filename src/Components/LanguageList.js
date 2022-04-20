import React from "react";

import styles from './Content.module.css';

import LanguageItem from "./LanguageItem";

const LanguageList = props => {
  return (
    <>
      <h2>Languages</h2>
      <ol className="language-list">
        {props.languages.map((language, i) => (
          <LanguageItem 
            key={language.id}
            language={language}
            selectLanguage={props.selectLanguage}
          />
        ))}
      </ol>
    </>
  );
};

export default LanguageList;