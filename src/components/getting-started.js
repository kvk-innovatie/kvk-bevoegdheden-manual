import React from 'react';
import styles from './getting-started.module.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useNavigate } from 'react-router-dom';

export default function GettingStarted({ target }) {
  let navigate = useNavigate();
  return (
    <div className={styles.main}>
      <h1>Aan de slag</h1>
      <p className={styles.intro}>
        Bij deze handreiking zit voorbeeld code, die je kan vinden op{' '}
        <a href="https://github.com/kvk-innovatie/kvk-bevoegdheden-rest-api">github</a>. Het runnen van de code maakt
        een REST API beschikbaar, die kan worden aangeroepen met een KVK nummer en persoonsgegevens. Op basis van het
        KVK nummer wordt via de KVK Dataservice een uittreksel opgevraagd. Vervolgens wordt er op basis van de
        persoonsgegevens gekeken of de gebruiker als functionaris vermeld staat op het uittreksel. Is dat het geval, dan
        worden de bevoegdheidsgegevens uit het uittreksel onttrokken en samen met een interpretatie van de bevoegdheid
        teruggegeven (bevoegdheidUittreksel). Deze service kan op de achtergrond gedraaid worden als onderdeel van{' '}
        <a
          href="#w"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/${target}`);
          }}>
          de totale oplossing
        </a>
        . In the README van de github repo wordt uitgelegd hoe je de service kan draaien.
      </p>
      <p style={{ fontStyle: 'italic' }}>
        Let op: Deze voorbeeldcode is ontwikkeld door KVK Innovatielab en bedoeld voor derden om mee te experimenteren.
        De code is niet produktieklaar en wordt uitgegeven onder Apache2 license. Er kunnen dus geen rechten aan worden
        ontleend.
      </p>

      <div>De API wordt aangeroepen met een POST request op hetvolgende endpoint:</div>
      <SyntaxHighlighter language="html" style={dracula}>
        {'http://localhost:3333/api/bevoegdheid/:kvkNummer'}
      </SyntaxHighlighter>
      <div>
        In de body van het request worden de persoonsgegevens meegegeven van degene van wie de bevoegdheid wordt
        gecontroleerd.
      </div>
      <SyntaxHighlighter language="javascript" wrapLines="true" style={dracula}>
        {`{
  geboortedatum: '01-01-2000',
  voornamen: 'Jan',
  geslachtsnaam: 'Klaasen',
  voorvoegselGeslachtsnaam: '',
}`}
      </SyntaxHighlighter>
      <div>
        De API antwoord met een bevoegdheidUittreksel. Het bevoegdheidUittreksel is een subset van velden uit de
        inschrijving, die relevant zijn voor het bepalen van iemands bevoegdheid. Als er een functionaris gevonden wordt
        op de inschrijving die matchet met de meegegeven persoonsgegevens, dan zullen de gegevens van de functionaris
        teruggegeven worden onder het kopje matchedFunctionaris.{' '}
        <a
          href="#w"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/${target}/docs`);
          }}>
          meer info over bevoegdheidUittreksel
        </a>{' '}
      </div>
      <SyntaxHighlighter language="javascript" wrapLines="true" style={dracula}>
        {`{
  "bevoegdheidUittreksel": {
    "kvkNummer": "90000003",
    "naam": "Company Indigreen B.V.",
    "persoonRechtsvorm": "Besloten Vennootschap",
    "adres": "Gerstlaan 8 5632KP Eindhoven",
    "bijzondereRechtstoestand": "",
    "beperkingInRechtshandeling": "",
    …
    "matchedFunctionaris": {
      "geslachtsnaam": "Klaasen",
      "voorvoegselGeslachtsnaam": "",
      "voornamen": "Jan",
      "geboortedatum": "01-01-2000",
      "typeFunctionaris": "Bestuursfunctie",
      "functie": "Bestuurder",
      "functietitel": "Direkteur",
      "soortBevoegdheid": "Alleen/zelfstandig bevoegd",
      "beperkingInEurosBevoegdheid": "",
      …
      "interpretatie": {
        "heeftBeperking": "Nee",
        "isBevoegd": "Ja",
        "reden": "Jan  Klaasen (Bestuurder) is Alleen/zelfstandig bevoegd"
      }
    }
  },
  …
}`}
      </SyntaxHighlighter>
      <div>
        Alle velden in het bevoegdheidUittreksel zijn een op een overgenomen uit het originele XML uittreksel, zoals hij
        geleverd wordt via de KVK Dataservice, behalve de velden onder het kopje interpretatie. Dit is de interpretatie
        van de bevoegdheid van de matchedFunctionaris, en is extra toegevoegd aan het bevoegdheidUittreksel. De
        interpretatie is belangrijk om eenvoudig tot iemands bevoegdheid te kunnen komen.{' '}
        <a
          href="#w"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/${target}/interpretatie`);
          }}>
          meer info over de interpretatie van een bevoegdheid
        </a>{' '}
        .Hieronder een stukje code als voorbeeld van hoe je tot iemands bevoegdheid kan komen.
      </div>

      <SyntaxHighlighter language="javascript" wrapLines="true" style={dracula}>
        {`function isBevoegd(bevoegdheidUittreksel) {
  if (bevoegdheidUittreksel.matchedFunctionaris === undefined) return false;
  var interpretatie = bevoegdheidUittreksel.matchedFunctionaris.interpretatie;
  if (interpretatie.isBevoegd == 'Ja') return true;
  return false;
}`}
      </SyntaxHighlighter>
      <div style={{ padding: '12px 0' }}></div>
    </div>
  );
}
