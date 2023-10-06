import styles from './disclaimer.module.css';

export default function Disclaimer({ isBevoegd, reason }) {
  return (

    <div className={styles.main}>
      <div className={styles.bottombar}>
        <div>

        <strong>Let op:</strong> Deze handreiking, alle informatie en alle voorbeeldcode is een pilot innovatie project van de afdeling
        innovatielab van de KVK. Deze handreiking wordt niet onderhouden en is geen officieel KVK product of publicatie.
        </div>
      </div>
      <div className={styles.topbar}></div>
    </div>

  );
}
