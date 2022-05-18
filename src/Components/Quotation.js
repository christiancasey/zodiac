import React from 'react';

import styles from './Lemma.module.css';
import { IoIosTrash } from "react-icons/io";

const Quotation = props => {
  const quotation = props.quotation;
  const i = props.i;
  
  const [style, setStyle] = React.useState({display: 'none'});
  
  return (
    <div 
      className={styles.quotationsList}
      onMouseEnter={e => {
        setStyle({display: 'block'});
      }}
      onMouseLeave={e => {
        setStyle({display: 'none'});
      }}
    >
      <h4>
        {i+1}
      </h4>
      
      <div className={styles.row}>
        <label className={styles.label} htmlFor={"original_"+quotation.id}>Original</label>
        <textarea
          className={styles.inputWide}
          name={"original_"+quotation.id}
          placeholder="original"
          value={quotation.original}
          onChange={e => props.updateQuotation("original", e.target.value, quotation.id)} 
        />
      </div>
      <div className={styles.row}>
        <label className={styles.label} htmlFor={"transliteration_"+quotation.id}>Transliteration</label>
        <textarea
          className={styles.inputTransliterationWide}
          name={"transliteration_"+quotation.id}
          placeholder="transliteration"
          value={quotation.transliteration}
          onChange={e => props.updateQuotation("transliteration", e.target.value, quotation.id)} 
        />
      </div>
      <div className={styles.row}>
        <label className={styles.label} htmlFor={"translation_"+quotation.id}>Translation</label>
        <textarea
          className={styles.inputWide}
          name={"translation_"+quotation.id}
          placeholder="original"
          value={quotation.translation}
          onChange={e => props.updateQuotation("translation", e.target.value, quotation.id)} 
        />
      </div>
      <div className={styles.row}>
        <label className={styles.label} htmlFor={"source_"+quotation.id}>Source</label>
        <input
          className={styles.inputWide}
          type="text"
          name={"source_"+quotation.id}
          placeholder="source"
          value={quotation.source}
          onChange={e => props.updateQuotation("source", e.target.value, quotation.id)} 
        />
      </div>
      <div className={styles.row}>
        <label className={styles.label} htmlFor={"genre_"+quotation.id}>Genre</label>
        <input
          className={styles.inputWide}
          type="text"
          name={"genre_"+quotation.id}
          placeholder="genre"
          value={quotation.genre}
          onChange={e => props.updateQuotation("genre", e.target.value, quotation.id)} 
        />
      </div>
      <div className={styles.row}>
        <label className={styles.label} htmlFor={"provenance_"+quotation.id}>Provenance</label>
        <input
          className={styles.inputWide}
          type="text"
          name={"provenance_"+quotation.id}
          placeholder="provenance"
          value={quotation.provenance}
          onChange={e => props.updateQuotation("provenance", e.target.value, quotation.id)} 
        />
      </div>
      <div className={styles.row}>
        <label className={styles.label} htmlFor={"date_"+quotation.id}>Date</label>
        <input
          className={styles.inputWide}
          type="text"
          name={"date_"+quotation.id}
          placeholder="date"
          value={quotation.date}
          onChange={e => props.updateQuotation("date", e.target.value, quotation.id)} 
        />
      </div>
      <div className={styles.row}>
        <label className={styles.label} htmlFor={"publication_"+quotation.id}>Publication</label>
        <input
          className={styles.inputWide}
          type="text"
          name={"publication_"+quotation.id}
          placeholder="publication"
          value={quotation.publication}
          onChange={e => props.updateQuotation("publication", e.target.value, quotation.id)} 
        />
      </div>
      <div className={styles.row}>
      <button className={styles.add} style={style} onClick={() => props.deleteQuotation(quotation.id)}><IoIosTrash /></button>
      </div>
    </div>
  );
};

export default Quotation;