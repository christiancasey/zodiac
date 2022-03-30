import React from "react";

import styles from './Lemma.module.css';

let Lemma = props => {
  const [lemma, setLemma] = React.useState(props.lemma);
  
  React.useEffect(() => {
    setLemma(props.lemma);
  }, [props.lemma]);
  
  const onChange = e => {
    setLemma(prevLemma => {
      return {
        ...prevLemma,
        [e.target.name]: e.target.value,
      }
    })
  };
  
  return (
    <div>
      <h1>Lemma</h1>
      <form className={styles.form}>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="lemmaId">Lemma ID</label>
          <input className={styles.input} type="text" name="lemmaId" placeholder="0" value={lemma.lemmaId} onChange={(onChange)} disabled={true} />
        </div>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="language">Language</label>
          <input className={styles.input} type="text" name="language" placeholder="language" value={lemma.language} onChange={onChange} />
        </div>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="partOfSpeech">Part of Speech</label>
          <input className={styles.input} type="text" name="partOfSpeech" placeholder="partOfSpeech" value={lemma.partOfSpeech} onChange={onChange} />
        </div>
        <br />
        <div className={styles.row}>
          <label className={styles.label} htmlFor="original">Original</label>
          <input className={styles.input} type="text" name="original" placeholder="original" value={lemma.original} onChange={onChange} />
        </div>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="transliteration">Transliteration</label>
          <input className={styles.input} type="text" name="transliteration" placeholder="transliteration" value={lemma.transliteration} onChange={onChange} />
        </div>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="translation">Translation</label>
          <input className={styles.input} type="text" name="translation" placeholder="translation" value={lemma.translation} onChange={onChange} />
        </div>

        <br /><br />
      </form>
    </div>
  );
};

export default Lemma;