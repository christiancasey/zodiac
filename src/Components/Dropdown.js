import React from 'react';
import styles from './Lemma.module.css';

const Dropdown = ({ name, label, value, options, onChange }) => {
  return (
    <tr>
      <td><label className={styles.label} htmlFor={"dropdown_"+label}>{label}</label></td>
      <td><select className={styles.input} name={name} value={value} onChange={onChange}>
        {options.map(option => (
          <option key={option.id} value={option.value}>{option.label}</option>
        ))}
      </select></td>
    </tr>
  );
};

export default Dropdown;