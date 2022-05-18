import React from "react";
import { IoIosAddCircle } from "react-icons/io";
// import { v4 as uuidv4 } from "uuid";

import styles from './Lemma.module.css';

import Meaning from './Meaning';

const Meanings = props => {
  // const [meanings, setMeanings] = React.useState(props.meanings);
  const meanings = props.meanings;
  
  return (
    <div className={styles.meanings}>
      <h3>Meanings</h3>
      {meanings.map((meaning, i) => {
        return (
          <Meaning 
            key={meaning.id}
            meaning={meaning}
            i={i}
            updateMeaning={props.updateMeaning}
            deleteMeaning={props.deleteMeaning}
          />
        )
      })}
      <button className={styles.add} onClick={props.addNewMeaning}><IoIosAddCircle /></button>
    </div>
  );
};

export default Meanings;