import React from 'react';
import styles from './home.module.css';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

export default function Home() {
  let navigate = useNavigate();
  return (
    <div className={styles.main}>
      <h1>Handreiking KVK Bevoegdheden</h1>
      <p className={styles.intro}>
        Deze handreiking is bedoeld voor partijen, die van hun gebruikers willen weten of zij mogen handelen namens hun
        organisatie.
      </p>
      <p>Waar wilt u deze handreiking voor gebruiken?</p>

      <div className={styles.optionContainer}>
        <div>
          <div className={styles.optionText}>
            <div>
              Ik wil zelf een oplossing bouwen waarmee ik van mijn gebruikers kan achterhalen of zij bevoegd zijn om te
              mogen handelen namens hun organisatie,
            </div>

            <div style={{ padding: '6px 0' }}>of, </div>
            <div>Ik wil zo’n oplossing bouwen voor derden.</div>
          </div>
          <div>
            <Button onClick={() => navigate('/broker')}>Ga naar de complete handreiking</Button>
          </div>
        </div>
        <div>
          <div className={styles.optionText}>
            Ik wil van mijn gebruikers weten of zij bevoegd zijn om te mogen handelen namens hun organisatie. Ik doe dit
            via een broker, of via een bestaande wallet, die de oplossing gebouwd heeft op basis van deze handreiking.
          </div>
          <div>
            <Button onClick={() => navigate('/verifier')}>Ga naar de verifier handleiding</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
