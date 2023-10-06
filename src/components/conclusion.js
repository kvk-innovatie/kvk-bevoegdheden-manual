import styles from './conclusion.module.css';

export default function Conclusion({ isBevoegd, reason }) {
  return (
    <div className={styles.main}>
      <div>
        {isBevoegd ? (
          <div className={styles.iconContainer}>
            <span className={styles.icon} style={{ color: '#099309' }}>
              ✓
            </span>
            <span>Bevoegd</span>
          </div>
        ) : (
          <div className={styles.iconContainer}>
            <span className={styles.icon} style={{ color: 'red' }}>
              ✗
            </span>
            <span>Niet bevoegd</span>
          </div>
        )}
      </div>
      <div>{`reden: ${reason}`}</div>
    </div>
  );
}
