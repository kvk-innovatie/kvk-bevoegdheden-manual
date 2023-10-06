import React, { useState, useEffect } from 'react';
import styles from './info.module.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

let infoPerPath = {
  'naamPersoon$':'typeEigenaar',
  'natuurlijkPersoon$':'typeEigenaar',
  'buitenlandseVennootschap$':'typeEigenaar',
  'eenmanszaakMetMeerdereEigenaren$':'typeEigenaar',
  'rechtspersoon$':'typeEigenaar',
  'rechtspersoonInOprichting$':'typeEigenaar',
  'samenwerkingsverband$':'typeEigenaar',
  'afgeslotenMoeder$':'typeEigenaar',

  'aansprakelijke$':'typeFunctionaris',
  'bestuursfunctie$':'typeFunctionaris',
  'functionarisBijzondereRechtstoestand$':'typeFunctionaris',
  'gemachtigde$':'typeFunctionaris',
  'overigeFunctionaris$':'typeFunctionaris',
  'publiekrechtelijkeFunctionaris$':'typeFunctionaris',

  'geslachtsnaam':'geslachtsnaam',
  'voorvoegselGeslachtsnaam':'voorvoegselGeslachtsnaam',
  'voornamen':'voornamen',
  'geboortedatum':'geboortedatum',
  'overlijdensdatum':'overlijdensdatum',
  'volledigeNaam':'volledigeNaam',

  'peilmoment':'peilmoment',
  'kvkNummer':'kvkNummer',
  'naam':'naam',
  'handeltOnder':'handelsnamen',
  'volledigAdres':'adres',
  'emailAdres':'emailAdres',
  'communicatienummer':'telefoon',
  'maatschappelijkeActiviteit.registratie.datumAanvang':'registratieAanvang',
  
  'datumUitschrijving':'datumUitschrijving',

  'bijzondereRechtstoestand':'bijzondereRechtstoestand',
  'beperkingInRechtshandeling':'beperkingInRechtshandeling',
  'bevoegdheid.soort':'soortBevoegdheid',
  'functie.omschrijving':'functie',
  'functietitel':'functietitel',
  'typeVolmacht':'typeVolmacht',
  'persoonRechtsvorm':'persoonRechtsvorm',
  'isBevoegdMetAnderePersonen':'isBevoegdMetAnderePersonen',
  'heeftOverigeVolmacht':'heeftOverigeVolmacht',
  'sbiCode':'sbiCode',
  'buitenlandseRechtstoestand':'buitenlandseRechtstoestand',
  'handlichting':'handlichting',
  'beperkingInEuros':'beperkingInEuros',
  'overigeBeperking':'overigeBeperking',
  'schorsing.registratie.datumAanvang':'schorsingAanvang',
  'schorsing.registratie.datumEinde':'schorsingEinde',
  'beperkingInGeld':'beperkingInGeld',
  'magOpgaveHandelsregisterDoen':'magOpgaveHandelsregisterDoen',
  'omschrijvingOverigeVolmacht':'omschrijvingOverigeVolmacht',
  'beperkingInHandeling':'beperkingInHandeling',
  
  'registratie.datumEinde':'registratieEinde',
  'rsin':'rsin',
  
  'heeftBeperking':'heeftBeperking',
  'isBevoegd':'isBevoegd',
  'reden':'reden',

  // 'ontbinding',
};

export default function Info({ highlight }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!highlight) {
      let filePath = require(`../data/bevoegdheidUittreksel.md`);
            fetch(filePath)
              .then((res) => res.text())
              .then((text) => setContent(text));
    } else {
      let paths = Object.keys(infoPerPath)
      for (let i = 0; i < paths.length; i++) {
        let path = paths[i];
        let name = infoPerPath[path];
        const pathRegex = new RegExp(path);
        if (highlight.match(pathRegex)) {
          try {
            let filePath = require(`../data/${name}.md`);
            fetch(filePath)
              .then((res) => res.text())
              .then((text) => setContent(text));
          } catch (error) {
            setContent(`## ${name}`);
          }

          break;
        }
      }
    }
  }, [highlight]);

  return (
    <div className={styles.main}>
      <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
    </div>
  );
}
