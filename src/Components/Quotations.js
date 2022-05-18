import React from "react";
import { IoIosAddCircle } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

import styles from './Lemma.module.css';

import Quotation from './Quotation';

const Quotations = props => {
  const newQuotation = {
    id: uuidv4(),
    original: '',
    transliteration: '',
    translation: '',
    source: '',
    genre: '',
    provenance: '',
    date: '',
    publication: '',
  };
  
  return (
    <div className={styles.quotations}>
      <h3>Quotations</h3>
      {props.quotations.map((quotation,i) => {
        return (
          <Quotation 
            key={quotation.id} 
            quotation={quotation} 
            i={i} 
            updateQuotation={props.updateQuotation}
            deleteQuotation={props.deleteQuotation}
          />
        )
      })}
      
      <button className={styles.add} onClick={props.addNewQuotation}><IoIosAddCircle /></button>
      
      
    </div>
  );
};

export default Quotations;