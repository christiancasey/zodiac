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
            <li key={lemma.lemmaId}>
              <button className={styles.lemmaList} onClick={() => props.selectNewLemma(lemma.lemmaId)}>
              {lemma.translation} — {lemma.transliteration} — {lemma.original}
              </button>
            </li>);
        })}
      </ol>
    </>
  );
};

export default Lemmata;