import React from 'react';
import styles from './home-broker.module.css';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

export default function HomeBroker({ target }) {
  let navigate = useNavigate();
  return (
    <div className={styles.main}>
      <h1>Handleiding KVK Bevoegdheden voor verifiers</h1>
      <p className={styles.intro}>
        Deze handleiding is bedoeld voor partijen, die van hun gebruikers het bewijs willen dat zij bevoegd zijn om te
        handelen namens hun organisatie, en daarvoor gebruik maken van een oplossing van een derde partij.
      </p>

      <p>
        Je zal de KVK bevoegdheidsgegevens van je gebruiker ontvangen via het uitlezen van een wallet kaartje, of via
        het OpenID Connect concept (inloggen met KVK knop).
      </p>

      <p style={{ fontStyle: 'italic', padding: '0 12px 6px' }}>
        Deze handleiding is alleen bedoeld voor partijen, die gebruik maken van een oplossing, die gebouwd is op basis van
        deze handleiding. Momenteel is dat alleen het KVK kaartje in de IRMA wallet.
      </p>

      <div>
        De KVK bevoegheidsgegevens (bevoegdheidUittreksel) bestaan uit een groot aantal velden, die je als verifiërende partij van je gebruiker
        kan opvragen. Deze velden zijn op te delen in de volgende categorieen: (
        <a
          href="#w"
          onClick={(e) => {
            e.preventDefault();
            navigate(`docs`);
          }}>
          meer info over de velden
        </a>
        )
        <ul>
          <li>
            Velden, die kenmerkend zijn voor een organisatie: naam, KVK nummer, vestigingsadres, emailadres, SBI
            activiteiten, etc.
          </li>
          <li>Velden, die kenmerkend zijn voor jouw als functionaris: je naam, geboortedatum, functie, etc.</li>
          <li>
            Velden, die gebruikt worden voor het bepalen van je bevoegdheid: soortBevoegdheid, typeVolmacht,
            beperkingInEuros, schorsingAanvang, bijzondereRechtstoestand, etc.
          </li>
        </ul>
      </div>

      <p>
        Het aantal velden voor het bepalen van iemands bevoegdheid is vrij groot. Daarom wordt een extra veld meegegeven
        'isBevoegd', waarin een groot deel van de logica om tot een bevoegdheid te komen zit verwerkt. Echter in een
        substantieel deel van de gevallen kan iemands bevoegdheid niet worden vastgesteld op basis van de informatie van
        het KVK handelsregister. In dit geval zijn er een aantal velden beschikbaar, die jou als verifiërende partij
        kunnen helpen om een bevoegdheid te bepalen in jouw specifieke situatie. Meer informatie hierover kun je vinden
        onder het kopje
      </p>
      <div style={{ padding: '24px 0' }}>
        <Button onClick={() => navigate('/verifier/interpretatie')}>Interpretatie van een bevoegheid</Button>
      </div>
    </div>
  );
}
