import styles from './Lemma.module.css';

const Variants = props => {
  return (
    <div className={styles.variants}>
      <h3>Variants</h3>
      {props.variants.map((variant,i) => {
        return (
          <div key={variant.id} className={styles.row}>
            <label className={styles.label} htmlFor={"original_"+variant.id}>{i+1}</label>
            <input
              className={styles.input}
              type="text"
              name={"original_"+variant.id}
              placeholder="original"
              value={variant.original}
              onChange={e => props.updateVariant("original", e.target.value, variant.id)} 
            />
            <input
              style={{float: 'right'}}
              className={styles.inputTransliteration}
              type="text"
              name={"transliteration_"+variant.id}
              placeholder="transliteration"
              value={variant.transliteration}
              onChange={e => props.updateVariant("transliteration", e.target.value, variant.id)} 
            />
          </div>
        )
      })}
    </div>
  );
};

export default Variants;