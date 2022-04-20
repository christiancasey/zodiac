import React from "react";

import styles from './Content.module.css';

const Lemmata = props => {
  const lemmata = props.lemmata;
  
  if (!lemmata.length)
    return (
      <>
        <h2>Lemmata</h2>
        <div style={{opacity: 0.5}}>
         <p>No lemmata match your search criteria.</p>
         <p>Please adjust the settings above to find matches.</p>
        </div>
      </>
    );
  
  return (
    <>
      <h2>Lemmata</h2>
      <ol className="lemma-list">
        {lemmata.map((lemma,i) => {
          return (
            <li
              key={lemma.lemmaId}
              className={"lemma-list" + (i===props.selectedLemmaIndex ? " selected" : "")}
            >
              <a href="#" className="lemma-list" onClick={() => props.selectNewLemma(i)}>
              {lemma.translation} {lemma.original}
              </a>
            </li>);
        })}
      </ol>
    </>
  );
};

export default Lemmata;