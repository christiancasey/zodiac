import React from "react";
import { IoIosTrash } from "react-icons/io";

import styles from './Lemma.module.css';

const Meaning = props => {
  const meaning = props.meaning;
  const i = props.i;
  
  const [style, setStyle] = React.useState({display: 'none'});
  
  const onChange = e => {
    console.log(e.target.value);
    props.updateMeaning(e.target.value, meaning.id);
  };
  
  return (
    <div 
      className={styles.row}
      onMouseEnter={e => {
        setStyle({display: 'block'});
      }}
      onMouseLeave={e => {
        setStyle({display: 'none'});
      }}
    >
      <label className={styles.label} htmlFor={meaning.id}>{i+1}</label>
      <input
        className={styles.inputMeaning}
        type="text"
        name={meaning.id}
        placeholder="meaning"
        value={meaning.value}
        onChange={onChange}
      />
      <button className={styles.delete} style={style} onClick={() => props.deleteMeaning(meaning.id)}><IoIosTrash /></button>
      <br />
    </div>
  );
};

export default Meaning;