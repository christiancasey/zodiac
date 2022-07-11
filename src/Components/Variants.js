import React from 'react';
import styles from './Lemma.module.css';
import { IoIosAddCircle } from "react-icons/io";

import Variant from './Variant';

const Variants = props => {
  return (
    <div className={styles.variants}>
      <h3>Variants</h3>
      {props.variants.map((variant,i) => {
        return (
          <Variant
            key={variant.id}
            variant={variant}
            i={i}
            updateVariant={props.updateVariant}
            deleteVariant={props.deleteVariant}
          />
        )
      })}
      <button className={styles.add} onClick={props.addNewVariant}><IoIosAddCircle /></button>
    </div>
  );
};

export default Variants;