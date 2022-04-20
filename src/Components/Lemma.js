import React from "react";
import { v4 as uuidv4 } from "uuid";

import styles from './Lemma.module.css';

import Dropdown from './Dropdown';
import Meanings from './Meanings';
import Variants from './Variants';
import Quotations from './Quotations';

let Lemma = props => {
  
  const [lemma, setLemma] = React.useState(JSON.parse(props.lemma));
  // const [meanings, setMeanings] = React.useState(props.lemma.meanings);
  // const [variants, setVariants] = React.useState(props.lemma.variants);
  
  React.useEffect(() => { setLemma(JSON.parse(props.lemma)); }, [props.lemma]);
  // React.useEffect(() => { setMeanings(props.lemma.meanings); }, [props.lemma.meanings]);
  // React.useEffect(() => { setVariants(props.lemma.variants); }, [props.lemma.variants]);
  
  const onChange = e => {
    setLemma(prevLemma => {
      return {
        ...prevLemma,
        [e.target.name]: e.target.value,
      }
    });
  };
  
  const updateMeaning = (updatedMeaning, id) => {
    // setMeanings(
    //   meanings.map(meaning => {
    //     if (meaning.id === id) {
    //       meaning.value = updatedMeaning;
    //     }
    //     return meaning;
    //   })
    // );
    setLemma(prevLemma => {
      return {
        ...prevLemma,
        meanings: prevLemma.meanings.map(meaning => {
          if (meaning.id === id) {
            meaning.value = updatedMeaning;
          }
          return meaning;
        })
      }
    });
  };
  
  const updateVariant = (key, updatedVariant, id) => {
    setLemma(prevLemma => {
      return {
        ...prevLemma,
        variants: lemma.variants.map(variant => {
          if (variant.id === id) {
            variant[key] = updatedVariant;
          }
          return variant;
        })
      }
    });
  };
  
  const updateQuotation = (key, updatedQuotation, id) => {
    setLemma(prevLemma => {
      return {
        ...prevLemma,
        quotations: lemma.quotations.map(quotation => {
          if (quotation.id === id) {
            quotation[key] = updatedQuotation;
          }
          return quotation;
        })
      }
    });
  };
  
  const resetLemma = () => {
    setLemma(JSON.parse(props.lemma));
  }
  
  const saveLemma = () => {
    props.saveLemma(lemma);
  };
    
  if (!props.lemma)
    return (
      <>
        <h1>Lemma</h1>
        <div style={{opacity: 0.5}}>
         <p>No lemma selected.</p>
         <p>Please select a lemma from the options on the right.</p>
        </div>
      </>
    );
  
  return (
    <div>
      <h1>Lemma</h1>
      <form className={styles.form}>
        <div className={styles.box}>
          <h3>Basic</h3>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="lemmaId">Lemma ID</label>
            <input className={styles.input} type="text" name="lemmaId" placeholder="0" value={lemma.lemmaId} onChange={(onChange)} disabled={true} />
          </div>
          <Dropdown
            name="language"
            label="Language"
            value={lemma.language}
            options={props.languageOptions}
            onChange={onChange} 
          />
          <Dropdown
            name="partOfSpeech"
            label="Part of Speech"
            value={lemma.partOfSpeech}
            options={props.partOfSpeechOptions}
            onChange={onChange} 
          />
          <br />
          <div className={styles.row}>
            <label className={styles.label} htmlFor="original">Original</label>
            <input className={styles.input} type="text" name="original" placeholder="original" value={lemma.original} onChange={onChange} />
          </div>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="transliteration">Transliteration</label>
            <input className={styles.inputTransliteration} type="text" name="transliteration" placeholder="transliteration" value={lemma.transliteration} onChange={onChange} />
          </div>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="translation">Translation</label>
            <input className={styles.input} type="text" name="translation" placeholder="translation" value={lemma.translation} onChange={onChange} />
          </div>
        </div>
        
        <Meanings meanings={lemma.meanings} updateMeaning={updateMeaning} />
        
        <Variants variants={lemma.variants} updateVariant={updateVariant} />
        
        <Quotations quotations={lemma.quotations} updateQuotation={updateQuotation} />
        
      </form>
        
      
      
      
      <br /><br />
      <div className={styles.developmentData} style={{opacity: 0.7, color: '#2d2'}}>
        <b>Development stuff. Ignore everything below...</b>
        <br /><br />
        <button onClick={resetLemma}>Reset</button>
        <button onClick={saveLemma}>Save</button>
        <br /><br />
        <pre id="json">{JSON.stringify(lemma, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Lemma;