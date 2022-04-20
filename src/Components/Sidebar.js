import styles from './Content.module.css';

import Search from './Search';
import LanguageList from './LanguageList';
import Lemmata from './Lemmata';

const Sidebar = props => {
  return (
    <div className={styles.sidebar}>
      <Search />
      <LanguageList
        languages={props.languages}
        selectLanguage={props.selectLanguage}
      />
      <Lemmata
        lemmata={props.lemmata}
        selectedLemmaIndex={props.selectedLemmaIndex}
        selectNewLemma={props.selectNewLemma}
      />
      <div className={styles.addNewLemma}>
        <a href="#">Add new lemma...</a>
      </div>
    </div>
  );
};

export default Sidebar;