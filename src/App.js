import React from 'react';
import styles from './App.module.css';
import Header from './components/header';
import TargetGroup from './components/target-group';
import Home from './components/home';
import Disclaimer from './components/disclaimer';
import usePageTracking from './usePageTracking';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  usePageTracking();
  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.routeContainer}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:target/*" element={<TargetGroup />}></Route>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
      <Disclaimer />
    </div>
  );
}

export default App;
