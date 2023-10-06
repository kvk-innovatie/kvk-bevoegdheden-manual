import React from 'react';
import styles from './Button.module.css';

function Button({ children, color, ...props }) {
  let cn = styles.main;
  cn += ' ' + styles[color || 'blue'];
  if (props.disabled) {
    cn += ' ' + styles.disabled;
  }
  return (
    <button className={cn} {...props}>
      {children}
    </button>
  );
}

export default Button;
