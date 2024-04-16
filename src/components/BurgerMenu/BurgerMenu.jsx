import React from 'react';
import styles from './BurgerMenu.module.scss';

const BurgerMenu = ({ isOpen, toggleMenu }) => {
  return (
    <div className={isOpen ? `${styles.menuIcon} ${styles.open}` : styles.menuIcon} onClick={toggleMenu}>
      <div className={styles.iconBar}></div>
      <div className={styles.iconBar}></div>
      <div className={styles.iconBar}></div>
    </div>
  );
};

export default BurgerMenu;
