import React from "react";
import { IoMdSave } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import ReactTooltip from 'react-tooltip';

import styles from './Lemma.module.css';

import Dropdown from './Dropdown';
import Meanings from './Meanings';
import Variants from './Variants';
import Quotations from './Quotations';
import DeleteLemma from './DeleteLemma';


const DEBUG = false;
// let props.setChanged(false);

const Lemma = props => {
  
  const [lemma, setLemma] = React.useState(JSON.parse(props.lemma));
  
  
  React.useEffect(() => { 
    setLemma(JSON.parse(props.lemma));
  }, [props.lemma]);
  
  
  // Keyboard shortcuts
  const handleKeyPress = e => {
    // Meta keys
    if (e.ctrlKey || e.metaKey) {
      // Save shortcuts (ctrl+s and cmd+s)
      if (e.key === 's') {
        e.preventDefault();
        props.setChanged(false);
        saveLemma();
      }
    }
  };
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });
  
  const onChange = e => {
    if (e.target.type === "checkbox") {
      setLemma(prevLemma => {
        return {
          ...prevLemma,
          [e.target.name]: e.target.checked
        }
      });
    } else {
      setLemma(prevLemma => {
        return {
          ...prevLemma,
          [e.target.name]: e.target.value
        }
      });
    }
    props.setChanged(true);
  };
  
  const updateMeaning = (updatedMeaning, id) => {
    setLemma(prevLemma => {
      return {
        ...prevLemma,
        meanings: prevLemma.meanings.map(meaning => {
          if (meaning.id === id) {
            meaning.value = updatedMeaning;
          }
          return meaning;
        })
      }
    });
    props.setChanged(true);
  };
  
  const deleteMeaning = id => {
    setLemma(prevLemma => {
      return {
        ...prevLemma,
        meanings: prevLemma.meanings.filter(meaning => {
          return meaning.id !== id;
        }),
      };
    });
    props.setChanged(true);
  };
  
  const addNewMeaning = e => {
    e.preventDefault();
    
    const newMeaning = {
      id: uuidv4(),
      value: '',
    };
    
    setLemma(prevLemma => {
      return {
        ...prevLemma,
        meanings: [
          ...prevLemma.meanings,
          newMeaning
        ]
      };
    });
    props.setChanged(true);
  };
  
  const updateVariant = (key, updatedVariant, id) => {
    setLemma(prevLemma => {
      return {
        ...prevLemma,
        variants: lemma.variants.map(variant => {
          if (variant.id === id) {
            variant[key] = updatedVariant;
          }
          return variant;
        })
      }
    });
    props.setChanged(true);
  };
  
  const deleteVariant = id => {
    setLemma(prevLemma => {
      return {
        ...prevLemma,
        variants: prevLemma.variants.filter(variant => {
          return variant.id !== id;
        }),
      };
    });
    props.setChanged(true);
  };
  
  const addNewVariant = e => {
    e.preventDefault();
    
    const newVariant = {
      id: uuidv4(),
      original: '',
      transliteration: '', 
    };
    
    setLemma(prevLemma => {
      return {
        ...prevLemma,
        variants: [
          ...prevLemma.variants,
          newVariant
        ]
      };
    });
    props.setChanged(true);
  };
  
  const updateQuotation = (key, updatedQuotation, id) => {
    setLemma(prevLemma => {
      return {
        ...prevLemma,
        quotations: lemma.quotations.map(quotation => {
          if (quotation.id === id) {
            quotation[key] = updatedQuotation;
          }
          return quotation;
        })
      }
    });
    props.setChanged(true);
  };
  
  const deleteQuotation = id => {
    setLemma(prevLemma => {
      return {
        ...prevLemma,
        quotations: prevLemma.quotations.filter(quotation => {
          return quotation.id !== id;
        }),
      };
    });
    props.setChanged(true);
  };
  
  const addNewQuotation = e => {
    e.preventDefault();
    
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
    }
    
    setLemma(prevLemma => {
      return {
        ...prevLemma,
        quotations: [
          ...prevLemma.quotations,
          newQuotation
        ]
      };
    });
    props.setChanged(true);
  };
  
  const saveLemma = () => {
    props.setChanged(false);
    props.saveLemma(lemma);
  };
    
  if (!props.lemma)
    return (
      <>
        <h1>Lemma</h1>
        <div style={{opacity: 0.5}}>
         <p>No lemma selected.</p>
         <p>Please select a lemma from the options on the right.</p>
        </div>
      </>
    );
  
  return (
    <div>
      <h1>
        {props.changed ? <i>Lemma (unsaved)</i> : 'Lemma'}
        <button className={styles.delete} onClick={() => saveLemma()}><IoMdSave /></button>
      </h1>
      <form className={styles.form}>
        <div className={styles.basic}>
          <h3>Basic</h3>
          <table><tbody>
            {/*<tr>
              <td><label className={styles.label} htmlFor="lemmaId">Lemma ID</label></td>
              <td><input className={styles.input} type="text" name="lemmaId" placeholder="0" value={lemma.lemmaId} onChange={(onChange)} disabled={true} /></td>
            </tr>*/}
            <tr>
              <td>
                <label
                  className={styles.label}
                  htmlFor="published"
                  data-tip="If checked, this lemma will be visible to all site visitors."
                  data-for="published"
                >
                  Published
                </label>
                <ReactTooltip id="published" type="light" html={true} />
              </td>
              <td>
                <input
                  type="checkbox"
                  name="published"
                  checked={lemma.published}
                  onChange={(onChange)}
                />
              </td>
            </tr>
            <Dropdown
              name="language"
              label="Language"
              value={lemma.language}
              options={props.languageOptions}
              onChange={onChange} 
            />
            <Dropdown
              name="partOfSpeech"
              label="Part of Speech"
              value={lemma.partOfSpeech}
              options={props.partOfSpeechOptions}
              onChange={onChange} 
            />
            <tr>
              <td>
                <label
                  className={styles.label}
                  htmlFor="original"
                  data-tip="Akkadian: transliteration<br />Egyptian: hieroglyphic<br />Other: original text (Unicode)"
                  data-for="original"
                >
                  Dictionary Form
                </label>
                <ReactTooltip id="original" type="light" html={true} />
              </td>
              <td>
                <input
                  className={styles.input}
                  type="text"
                  name="original"
                  placeholder="original"
                  value={lemma.original}
                  onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label
                  className={styles.label}
                  htmlFor="transliteration"
                  data-tip="Akkadian: (normalized) transcription<br />Egyptian: Egyptological transliteration<br />Other: Roman transliteration"
                  data-for="phonetic"
                >
                  Transliteration
                </label>
                <ReactTooltip id="phonetic" type="light" html={true} />
              </td>
              <td>
                <input
                  className={styles.inputTransliteration}
                  type="text"
                  name="transliteration"
                  placeholder="transliteration"
                  value={lemma.transliteration}
                  onChange={onChange} /></td>
            </tr>
            <tr>
              <td><label className={styles.label} htmlFor="translation">English</label></td>
              <td><input className={styles.input} type="text" name="translation" placeholder="translation" value={lemma.translation} onChange={onChange} /></td>
            </tr>
          </tbody></table>
        </div>
        
        <Meanings
          meanings={lemma.meanings}
          updateMeaning={updateMeaning}
          addNewMeaning={addNewMeaning}
          deleteMeaning={deleteMeaning}
        />
        
        <Variants
          variants={lemma.variants}
          updateVariant={updateVariant}
          addNewVariant={addNewVariant}
          deleteVariant={deleteVariant}
        />
        
        <Quotations
          quotations={lemma.quotations}
          updateQuotation={updateQuotation}
          addNewQuotation={addNewQuotation}
          deleteQuotation={deleteQuotation}
        />
        
      </form>
        
      <DeleteLemma lemma={lemma} deleteLemma={props.deleteLemma} />
            
      <div className={styles.developmentData} style={{opacity: 0.7, color: '#2d2'}}>
        <pre id="json">{DEBUG ? JSON.stringify(lemma, null, 2) : ''}</pre>
      </div>
    </div>
  );
};

export default Lemma;