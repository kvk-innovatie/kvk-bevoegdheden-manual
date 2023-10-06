import React, { useState, useEffect } from 'react';
import styles from './interpretatie.module.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

let chapters = ['heeftBeperking', 'isBevoegd'];
let examples = ['voorbeeld1', 'voorbeeld2', 'voorbeeld3', 'voorbeeld4'];
let examplesCode = [
`function isBevoegd(bevoegdheidUittreksel) {
  if (bevoegdheidUittreksel.matchedFunctionaris === undefined) return false;
  var interpretatie = bevoegdheidUittreksel.matchedFunctionaris.interpretatie;
  if (interpretatie.isBevoegd == 'Ja') return true;
  return false;
}`,
`function isBevoegd(bevoegdheidUittreksel) {
  if (bevoegdheidUittreksel.matchedFunctionaris === undefined) return false;
  var interpretatie = bevoegdheidUittreksel.matchedFunctionaris.interpretatie;
  if (
    interpretatie.isBevoegd === 'Ja' ||
    interpretatie.isBevoegd === 'Niet vastgesteld'
  ){
    return true;
  }
  return false;
}`,
`function isBevoegd(bevoegdheidUittreksel) {
  if (bevoegdheidUittreksel.matchedFunctionaris === undefined) return false;
  var matchedFunctionaris = bevoegdheidUittreksel.matchedFunctionaris;
  var interpretatie = matchedFunctionaris.interpretatie;
  if (
    interpretatie.isBevoegd === 'Ja' ||
    matchedFunctionaris.soortBevoegdheid === 'Gezamenlijk bevoegd' ||
    matchedFunctionaris.beperkingInEurosBevoegdheid.split(' ')[0] >= 10000 ||
    matchedFunctionaris.beperkingInGeldVolmacht.split(' ')[0] >= 10000
  ){
    return true;
  }
  return false;
}`,
`function isBevoegd(bevoegdheidUittreksel) {
  if (bevoegdheidUittreksel.matchedFunctionaris === undefined) return false;
  var matchedFunctionaris = bevoegdheidUittreksel.matchedFunctionaris;
  var interpretatie = matchedFunctionaris.interpretatie;
  if (
    interpretatie.isBevoegd === 'Ja' ||
    matchedFunctionaris.beperkingInHandelingVolmacht === 'Afsluiten software-contracten' ||
    matchedFunctionaris.beperkingInHandelingVolmacht === 'RDW eDienst Schorsen Voertuigen' ||
  ){
    return true;
  }
  return false;
}`,
];

export default function Interpretatie() {
  const [chaptersContent, setChaptersContent] = useState([]);
  const [examplesContent, setExamplesContent] = useState([]);

  // function isBevoegd(bevoegdheidUittreksel) {
  //   if (bevoegdheidUittreksel.matchedFunctionaris === undefined) return false;
  //   var interpretatie = bevoegdheidUittreksel.matchedFunctionaris.interpretatie;
  //   if (
  //     interpretatie.isBevoegd === 'Ja' ||
  //     interpretatie.isBevoegd === 'Niet vastgesteld'
  //   ){
  //     return true;
  //   }
  //   return false;
  // }

  useEffect(() => {
    async function fetchAll() {
      const texts = await Promise.all(
        chapters.map(async (chapter) => {
          let path = require(`../data/${chapter}.md`);
          const resp = await fetch(path);
          return resp.text();
        })
      );
      setChaptersContent(texts);
    }
    async function fetchAllExamples() {
      const texts = await Promise.all(
        examples.map(async (chapter) => {
          let path = require(`../data/${chapter}.md`);
          const resp = await fetch(path);
          return resp.text();
        })
      );
      setExamplesContent(texts);
    }
    fetchAll();
    fetchAllExamples();
  }, []);

  return (
    <div className={styles.main}>
      <h1>Interpretatie van Bevoegdheden</h1>
      <p className={styles.intro}>
        Onder het kopje interpretatie staat hoe je de velden van het bevoegdheidUittreksel moet interpreteren om tot een
        bevoegdheid te komen. De interpretatie heeft drie velden: heeftBeperking, isBevoegd en reden, die hieronder
        worden uitgelegd. Een interpretatie van een bevoegdheid is alleen beschikbaar als er een functionaris op de
        inschrijving is gevonden die matchet met de meegegeven persoonsgegevens.
      </p>
      <div className={styles.chapters}>
        {chaptersContent.map((chapterContent, index) => {
          let chapter = chapters[index];
          return (
            <div key={chapter} id={chapter}>
              <ReactMarkdown children={chapterContent} remarkPlugins={[remarkGfm]} />
            </div>
          );
        })}
      </div>
      <h1>Voorbeelden van Interpretaties</h1>
      <div className={styles.examples}>
        {examplesContent.map((exampleContent, index) => {
          let example = examples[index];
          let code = examplesCode[index];
          return (
            <div key={example} id={example}>
              <ReactMarkdown children={exampleContent} remarkPlugins={[remarkGfm]} />
              <SyntaxHighlighter language="javascript" style={dracula}>
                {code}
              </SyntaxHighlighter>
            </div>
          );
        })}
      </div>
    </div>
  );
}
