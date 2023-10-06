import React from 'react';
import styles from './target-group.module.css';
import HomeBroker from './home-broker';
import HomeVerifier from './home-verifier';
import GettingStarted from './getting-started';
import Interpretatie from './interpretatie';
import Docs from './docs';
import Contact from './contact';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';

export default function TargetGroup() {
  let { target } = useParams();
  return (
    <>
      <Routes>
        {target === 'broker' ? (
          <Route path="" element={<HomeBroker target={target} />}></Route>
        ) : (
          <Route path="" element={<HomeVerifier target={target} />}></Route>
        )}
        <Route path="gettingstarted" element={<GettingStarted target={target} />}></Route>
        <Route path="interpretatie" element={<Interpretatie target={target} />}></Route>
        <Route path="docs" element={<Docs target={target} />}></Route>
        <Route path="contact" element={<Contact target={target} />}></Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}
