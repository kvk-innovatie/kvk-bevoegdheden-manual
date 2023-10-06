import React from 'react';
import logo from '../images/logo.svg';
import styles from './header.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

function MenuItem({ loc, label }) {
  let navigate = useNavigate();

  let location = useLocation();
  return (
    <a
      href="#w"
      className={location.pathname === loc ? styles.selected : ''}
      onClick={(event) => {
        event.preventDefault();
        navigate(loc);
      }}>
      {label}
    </a>
  );
}

export default function Header() {
  let navigate = useNavigate();
  let location = useLocation();
  let type;
  if (location.pathname.includes('broker')) {
    type = 'broker';
  } else if (location.pathname.includes('verifier')) {
    type = 'verifier';
  }
  function renderLinks() {
    if (!type) return null;
    if (type === 'broker') {
      return (
        <div className={styles.right}>
          <div className={styles.menu}>
            <MenuItem loc="/broker" label="Home" />
            <MenuItem loc="/broker/gettingstarted" label="Aan de slag" />
            <MenuItem loc="/broker/interpretatie" label="Interpretatie" />
            <MenuItem loc="/broker/docs" label="Documentatie" />
            <MenuItem loc="/broker/contact" label="Contact" />
            <a href="https://github.com/kvk-innovatie/kvk-bevoegdheden-rest-api">Github</a>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.right}>
        <div className={styles.menu}>
          <MenuItem loc="/verifier" label="Home" />
          <MenuItem loc="/verifier/interpretatie" label="Interpretatie" />
          <MenuItem loc="/verifier/docs" label="Documentatie" />
          <MenuItem loc="/verifier/contact" label="Contact" />
        </div>
      </div>
    );
  }

  function renderSwitch() {
    if (!type) return null;
    return (
      <div className={styles.menu}>
        <a style={{color:type==='broker'?'#e07531':'black'}}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/broker`);
          }}
          href="#w">
          compleet
        </a>{' '}/{' '}
        <a style={{color:type==='verifier'?'#e07531':'black'}}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/verifier`);
          }}
          href="#w">
          verifier
        </a>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.topbar}></div>
      <div className={styles.bottombar}>
        <div className={styles.left} onClick={(e) => {
            e.preventDefault();
            navigate(`/`);
          }}>
          <img className={styles.logo} src={logo} alt="logo" />
          <div className={styles.title}>Bevoegdheden</div>
        </div>
        {renderSwitch()}
        <div>{renderLinks()}</div>
      </div>
    </div>
  );
}
