import styles from './Lemma.module.css';

const Dropdown = ({ name, label, value, options, onChange }) => {
  return (
    <div className={styles.row}>
      <label className={styles.label} htmlFor={"dropdown_"+label}>{label}</label>
      <select className={styles.input} name={name} value={value} onChange={onChange}>
        {options.map(option => (
          <option key={option.id} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;