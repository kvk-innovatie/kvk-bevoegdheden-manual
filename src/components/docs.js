import React, { useState, useEffect } from 'react';
import styles from './docs.module.css';
import axios from 'axios';
import Inschrijving from './inschrijving';
import Card from './card';
import Info from './info';
import format from 'xml-formatter';
import { useSearchParams } from 'react-router-dom';

export default function Docs() {
  let [searchParams, setSearchParams] = useSearchParams();
  let selectedTestUittreksel =
    searchParams.get('testuittreksel') || '90000003-persoon-is-alleen-zelfstandig-bevoegd-voor-een-bv';

  const [bevoegdheidResponse, setBevoegdheidResponse] = useState();
  const [defaultHighlight, setDefaultHighlight] = useState();
  const [highlight, setHighlight] = useState();
  const [testUittreksels, setTestUittreksels] = useState([]);
  const [currentTab, setCurrentTab] = useState('info');
  const [error, setError] = useState();

  useEffect(() => {
    async function getTestUitreksels() {
      try {
        let { data } = await axios({
          url: `/api/test-inschrijvingen`,
          method: 'get',
        });
        setTestUittreksels(['90000000-inschrijving-niet-gevonden', ...data]);
      } catch (error) {
        console.log(error);
      }
    }
    getTestUitreksels();
  }, []);

  useEffect(() => {
    if (testUittreksels.length === 0) return;
    async function getBevoegdheid() {
      if (!selectedTestUittreksel) return setBevoegdheidResponse(null);
      let kvkNummer = selectedTestUittreksel.split('-')[0]
      try {
        let { data } = await axios({
          url: `/api/bevoegdheid/${kvkNummer}`,
          method: 'post',
          data: {
            geboortedatum: '01-01-2000',
            voornamen: 'Jan',
            geslachtsnaam: 'Klaasen',
            voorvoegselGeslachtsnaam: '',
          },
        });
        setBevoegdheidResponse(data);
        setDefaultHighlight(null);
      } catch (error) {
        setBevoegdheidResponse(null);
        setError(error.message);
      }
    }
    getBevoegdheid();
  }, [testUittreksels, selectedTestUittreksel]);

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.contentContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.tabs}>
              <div
                className={styles.tab + ' ' + (currentTab === 'info' ? styles.tabSelected : '')}
                onClick={() => setCurrentTab('info')}>
                Info
              </div>
              <div
                className={styles.tab + ' ' + (currentTab === 'inschrijving' ? styles.tabSelected : '')}
                onClick={() => setCurrentTab('inschrijving')}>
                KVK inschrijving
              </div>
              <div
                className={styles.tab + ' ' + (currentTab === 'xml' ? styles.tabSelected : '')}
                onClick={() => setCurrentTab('xml')}>
                Originele XML
              </div>
            </div>
            {currentTab === 'inschrijving' && (
              <div className={styles.inschrijvingContainer}>
                <Inschrijving inschrijving={bevoegdheidResponse && bevoegdheidResponse.inschrijving} highlight={highlight} />
              </div>
            )}
            {currentTab === 'info' && (
              <div className={styles.infoContainer}>
                <Info highlight={highlight} />
              </div>
            )}
            {currentTab === 'xml' && (
              <div className={styles.infoContainer}>
                <div className={styles.xml}>{format(bevoegdheidResponse.inschrijvingXML)}</div>
              </div>
            )}
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.selectContainer}>
              <select
                id="inschrijvingen"
                value={selectedTestUittreksel}
                onChange={(e) => setSearchParams({ testuittreksel: e.target.value })}>
                {testUittreksels.map((testUittreksel) => (
                  <option key={testUittreksel} value={testUittreksel}>
                    {testUittreksel}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.jsonContainer}>
              {bevoegdheidResponse ? (
                <Card
                  bevoegdheidUittreksel={bevoegdheidResponse.bevoegdheidUittreksel}
                  highlight={highlight}
                  setHighlight={setHighlight}
                  defaultHighlight={defaultHighlight}
                  setDefaultHighlight={setDefaultHighlight}
                  paths={bevoegdheidResponse.paths}
                  tab={currentTab}
                />
              ) : (
                <div style={{ padding: '12px' }}>{error}</div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.path}>
          <div>{highlight ? highlight.replaceAll('.', '/') : ''}</div>
        </div>
      </div>
    </div>
  );
}
