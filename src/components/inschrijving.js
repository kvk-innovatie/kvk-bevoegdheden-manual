import React from 'react';
import styles from './inschrijving.module.css';

export default function Inschrijving({ inschrijving, highlight }) {
  let ext = {
    maatschappelijkeActiviteit: inschrijving,
  };
  let highlightArray = highlight && highlight.split('.');

  function renderTree(tree, key, hla, id) {
    let val = tree[key];
    id += (id ? '.' : '') + key;

    if (typeof val === 'object') {
      let label = `${isNaN(key) ? `${key}: ` : '-'}`;
      let newHla;
      if (hla && hla[0] === key) newHla = hla.slice(1);
      let styleLabel = {};
      if (!isNaN(key)) styleLabel = { height: 0 };
      if (hla && hla[0] === key) styleLabel = { ...styleLabel, fontWeight: 'bold', color: 'black' };
      let styleChildren = { paddingLeft: '24px' };
      if (!isNaN(key)) styleChildren = { paddingLeft: '12px' };
      if (
        newHla &&
        newHla.length === 0 &&
        key !== 'bestuursfunctie' &&
        key !== 'aansprakelijke' &&
        key !== 'functionarisBijzondereRechtstoestand' &&
        key !== 'overigeFunctionaris' &&
        key !== 'publiekrechtelijkeFunctionaris' &&
        key !== 'gemachtigde' &&
        key !== 'natuurlijkPersoon' &&
        key !== 'naamPersoon' &&
        key !== 'buitenlandseVennootschap' &&
        key !== 'eenmanszaakMetMeerdereEigenaren' &&
        key !== 'rechtspersoon' &&
        key !== 'rechtspersoonInOprichting' &&
        key !== 'samenwerkingsverband' &&
        key !== 'afgeslotenMoeder'
      ) {
        styleChildren = { ...styleChildren, fontWeight: 'bold', color: 'black' };
      }

      return (
        <div id={id} key={key}>
          <div style={styleLabel}>{label}</div>
          <div style={styleChildren}>
            {val && Object.keys(val).map((k) => {
              return renderTree(val, k, newHla, id);
            })}
          </div>
        </div>
      );
    } else {
      let style = {};
      if (hla && hla[0] === key) style = { fontWeight: 'bold', color: 'black' };
      return (
        <div id={id} key={key} style={style}>
          <span>{isNaN(key) ? `${key}: ` : `- `}</span>
          {/* <span style={{ color: 'black' }}>{`${val || ''}`}</span> */}
          <span>{`${val || ''}`}</span>
        </div>
      );
    }
  }

  return <div className={styles.main}>{renderTree(ext, 'maatschappelijkeActiviteit', highlightArray, '')}</div>;
}
