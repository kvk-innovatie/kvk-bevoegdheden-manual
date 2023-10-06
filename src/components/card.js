import React from 'react';
import styles from './card.module.css';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

export default function Card({
  bevoegdheidUittreksel,
  paths,
  highlight,
  setHighlight,
  defaultHighlight,
  setDefaultHighlight,
  tab,
}) {
  function renderTree(tree, key, hla, id, paths) {
    let val = tree[key];
    id += (id ? '.' : '') + key;
    if (typeof val === 'object') {
      let newHla;
      if (hla && hla.join('.') === id) newHla = hla.slice(1);
      // let styleLabel = {};
      // if (hla && hla[0] === key) styleLabel = { ...styleLabel, fontWeight: 'bold', color: 'black' };
      let styleChildren = { paddingLeft: '12px' };
      // if (newHla && newHla.length === 0) styleChildren = { ...styleChildren, fontWeight: 'bold', color: 'black' };

      return (
        <div id={id} key={key}>
          {/* <div className={styles.cardHeader}>{key==='bevoegdheidUittreksel'?'maatschappelijke activiteit / eigenaar':key}</div> */}
          <div className={styles.cardHeader}>{key}</div>
          <div style={styleChildren}>
            {Object.keys(val).map((k) => {
              return renderTree(val, k, newHla, id, paths);
            })}
          </div>
        </div>
      );
    } else {
      let style = { padding: '0px 0' };
      if (hla && hla.join('.') === id) style = { ...style, fontWeight: 'bold' };
      let p = id.split('.').slice(1).join('.');
      let path = get(paths, p);
      if (highlight && highlight === path) {
        style = { ...style, cursor: 'pointer' };
      } else if (!path) {
        style = { ...style, opacity: '0.6' };
      }

      return (
        <div
          id={id}
          key={key}
          style={style}
          onMouseEnter={() => {
            if (path && !defaultHighlight) {
              setHighlight(path);
              if (tab === 'inschrijving') {
                // document.getElementById(lastVal).scrollIntoView(false)
                document.getElementById(path) &&
                  document
                    .getElementById(path)
                    .scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' }); //
              }
            }
          }}
          onMouseLeave={() => {
            if (!defaultHighlight) {
              setHighlight(null);
            }
          }}
          onClick={() => {
            if (defaultHighlight) {
              setDefaultHighlight(null);
              setHighlight(null);
            } else {
              setDefaultHighlight(path);
            }
          }}>
          <span
            style={highlight && highlight === path ? { color: '#ffa831', fontWeight: '500' } : {}}>{`${key}: `}</span>
          <span style={highlight && highlight === path ? { color: '#ffa831', fontWeight: '500' } : { color: 'white' }}>
            {`${val}`}
            <span style={{ float: 'right', fontWeight: 'bold' }}>
            {defaultHighlight === path ? (
              <span>✕</span>
            ) : (
              <span>ⓘ</span>
            )}
            </span>
           
          </span>
        </div>
      );
    }
  }

  if (!bevoegdheidUittreksel) return;

  let bhd = cloneDeep(bevoegdheidUittreksel);
  delete bhd.functionarissen;
  delete bhd.rechtspersoonFunctionarissen;

  bevoegdheidUittreksel = {
    bevoegdheidUittreksel: bhd,
  };

  let highlightArray = highlight && highlight.split('.');

  paths.peilmoment = 'peilmoment';
  if (paths.matchedFunctionaris) {
    paths.matchedFunctionaris.interpretatie = {
      heeftBeperking: 'heeftBeperking',
      isBevoegd: 'isBevoegd',
      reden: 'reden',
    };
  }
  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <div className={styles.bevoegdheidUittreksel}>
          {renderTree(bevoegdheidUittreksel, 'bevoegdheidUittreksel', highlightArray, '', paths)}
        </div>
      </div>
    </div>
  );
}
