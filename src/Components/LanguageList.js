import React from "react";

import LanguageItem from "./LanguageItem";

function LanguageList(props) {
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
}

export default LanguageList;



// <li key={i}>
//   <button className={"language-list" + (props.languages[language] ? " selected" : "")}
//     href="#" 
//     onClick={() => props.selectLanguage(language)}>
//       {props.languages[language] ? <BsToggleOn /> : <BsToggleOff />} {language}
//   </button>
// </li>