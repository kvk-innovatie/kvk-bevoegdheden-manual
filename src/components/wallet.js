import React, { useEffect, useState } from 'react';
import styles from './wallet.module.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Wallet() {
  const [content, setContent] = useState();
  useEffect(() => {
    async function fetchAll() {
      let path = require(`../wallets/manual.md`);
      const resp = await fetch(path);
      setContent(await resp.text());
    }

    fetchAll();
  }, []);

  return (
    <div className={styles.main}>
      <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
    </div>
  );
}
