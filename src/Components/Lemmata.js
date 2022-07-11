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
      <div className={styles.sortButtons}>
        Sort by: 
          <button className={styles.sortButtons} onClick={e => props.sortLemmata('original')}>Dictionary</button>
          <button className={styles.sortButtons} onClick={e => props.sortLemmata('transliteration')}>Transliteration</button>
          <button className={styles.sortButtons} onClick={e => props.sortLemmata('translation')}>Translation</button>
          {/* <button className={styles.sortButtons} onClick={e => props.sortLemmata('language')}>Language</button> */}
      </div>
      <br />
      <table className="lemma-list"><tbody>
        {lemmata.map((lemma,i) => {
          return (
            <tr key={lemma.lemmaId}>
              <td>
                <button className={styles.lemmaList} onClick={() => props.selectNewLemma(lemma.lemmaId)}>
                {lemma.original}
                </button>
              </td>
              <td>
                <button className={styles.lemmaList} onClick={() => props.selectNewLemma(lemma.lemmaId)}>
                {lemma.transliteration}
                </button>
              </td>
              <td>
                <button className={styles.lemmaList} onClick={() => props.selectNewLemma(lemma.lemmaId)}>
                {lemma.translation}
                </button>
              </td>
            </tr>);
        })}
      </tbody></table>
      <br />
    </>
  );
};

export default Lemmata;