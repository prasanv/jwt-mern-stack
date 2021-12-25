import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import smoothie from "../public/smoothie.png";

export default function Home() {
  return (
    <div className={styles.container}>
      <header>
        <div className={styles.smoothie}>
          <Image src={smoothie} alt="smoothie-image" />
        </div>
        <div className={styles.headings}>
          <h2>Smoothie Recipes</h2>
          <h3>By Ninjas For Ninjas</h3>
          <Link href="/smoothies">
            <a className={styles.btn}>View Recipes</a>
          </Link>
        </div>
      </header>
    </div>
  );
}
