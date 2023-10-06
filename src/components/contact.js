import React from 'react';
import styles from './contact.module.css';

export default function Contact({ target }) {
  // let text =
  //   'Ga je met deze handreiking aan de slag, laat het ons weten, we helpen je graag. Daar leren wij ook van.';
  // if (target === 'broker') {
  //   text =
  //     'Wil je een oplossing op de markt zetten, die derden kunnen afnemen om van hun gebruikers/klanten te kunnen achterhalen of zij bevoegd zijn om te mogen handelen namens hun organisatie, laat het ons weten, we helpen je graag. Daar leren wij ook van.';
  // }
  return (
    <div className={styles.main}>
      <h1>Contact</h1>
      <p className={styles.intro}>Ga je met deze handreiking aan de slag, laat het ons weten, we helpen je graag. Daar leren wij ook van.</p>
      <p>
        Ook voor andere vragen/opmerkingen, mail ons op <a href="mailto:michiel.mayer@kvk.nl">michiel.mayer@kvk.nl</a>
      </p>
    </div>
  );
}
