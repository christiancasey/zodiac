import React from "react";

function Lemmata(props) {
  const lemmata = props.lemmata;
  return (
    <>
      <h2>Lemmata</h2>
      <ol className="lemma-list">
        {lemmata.map((lemma,i) => {
          return (
            <li
              key={lemma.lemmaId}
              className={"lemma-list" + (i==props.selectedLemmaIndex ? " selected" : "")}
            >
              <a href="#" className="lemma-list" onClick={() => props.selectNewLemma(i)}>
              {lemma.translation} {lemma.original}
              </a>
            </li>);
        })}
      </ol>
    </>
  );
}

export default Lemmata;