import React from 'react';
import styles from './home-broker.module.css';
import { useNavigate } from 'react-router-dom';

export default function HomeBroker({ target }) {
  let navigate = useNavigate();
  return (
    <div className={styles.main}>
      <h1>Complete handreiking KVK Bevoegdheden</h1>
      <p className={styles.intro}>
        Deze handreiking is bedoeld voor partijen, die een oplossing willen bouwen, waarmee zij van hun gebruikers
        kunnen achterhalen of zij bevoegd zijn om te mogen handelen namens hun organisatie.
      </p>
      <div>
        Partijen kunnen dit bouwen voor eigen gebruik, of als een oplossing voor derden. Bij een oplossing voor derden
        zien we twee vormen:
      </div>
      <div>
        <ul>
          <li>
            Het wallet concept: Het bewijs voor een bevoegdheid voor een organisatie zit in de vorm van een kaartje in
            een wallet app. Bevoegdheidsgegevens worden gedeeld door het scannen van een QR-code vanuit de wallet app.
          </li>
          <li>
            Het OpenID Connect concept: Gebruikers maken een uitstapje naar een applicatie waar zij toestemming geven
            tot het delen van hun bevoegdheidsgegevens voor een organisatie. Deze gegevens worden via de achterkant bij
            een Identity server opgehaald. ('Login met KVK' knop)
          </li>
        </ul>
      </div>
      <div>
        In alle oplossing (voor eigen gebruik, of voor derde partijen) zijn drie stappen noodzakelijk.
        <ol>
          <li>De gebruiker geeft aan voor welke organisatie hij zijn bevoegdheid wil aantonen</li>
          <li>Vervolgens deelt de gebuiker zijn persoonsgegevens</li>
          <li>
            Ten slotte een check op het KVK-handelsregister om te verifiëren of de persoon bevoegd is namens zijn
            organisatie.
          </li>
        </ol>
      </div>
      <p>
        Stap 1 is voor de hand liggend. Ook voor stap 2 zijn meerdere oplossing beschikbaar, maar uit de praktijk blijkt
        dat stap 3 voor partijen veel lastiger is te realiseren.
      </p>
      <p>
        Bij KVK innovatielab hebben we deze handreiking ontwikkeld met voorbeeld code, die hulp biedt bij en uitleg
        geeft over stap 3.
      </p>
      <p>
        <a
          onClick={(e) => {
            e.preventDefault();
            navigate(`/${target}/gettingstarted`);
          }}
          href="#w">
          Aan de slag
        </a>{' '}
      </p>
    </div>
  );
}
