import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Header = () => {
  return (
    <div>
      <nav>
        <h1>
          <Link href="/">
            <a>Ninja Smoothies</a>
          </Link>
        </h1>
        <ul>
          <Link href="/">
            <a className={styles.headerBtn}>home</a>
          </Link>
          <Link href="/login">
            <a className={styles.headerBtn}>login</a>
          </Link>
          <Link href="/signup">
            <a className={styles.headerBtn}>signup</a>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
