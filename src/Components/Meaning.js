import styles from './Lemma.module.css';

const Meaning = props => {
  const meaning = props.meaning;
  const i = props.i;
  
  return (
    <div className={styles.row}>
      <label className={styles.label} htmlFor={meaning.id}>{i+1}</label>
      <input
        className={styles.input}
        type="text"
        name={meaning.id}
        placeholder="meaning"
        value={meaning.value}
        onChange={e => props.updateMeaning(e.target.value, meaning.id)} 
      />
      <br />
    </div>
  );
};

export default Meaning;