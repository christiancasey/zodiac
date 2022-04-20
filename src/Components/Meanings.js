import React from "react";
import { v4 as uuidv4 } from "uuid";

import styles from './Lemma.module.css';

import Meaning from './Meaning';

const Meanings = props => {
  const [meanings, setMeanings] = React.useState(props.meanings);
  
  const addNewMeaning = e => {
    const newMeaning = {
      id: uuidv4(),
      meaning: '',
    };
    
    setMeanings(prevMeanings => [...prevMeanings, newMeaning]);
    
    console.log('add new meaning');
  };
  
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
          />
        )
      })}
      <button onClick={() => addNewMeaning()}>New</button>
    </div>
  );
};

export default Meanings;