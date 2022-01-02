import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import smoothie from "../public/smoothie.png";

const smoothies = () => {
  return (
    <div>
      <ul className={styles.recipes}>
        <li className={styles.recipe}>
          <Image src={smoothie} alt="smoothie-image" />
          <h4>Banana Boost</h4>
          <p>Banana, Vanilla ice cream, Milk</p>
        </li>
        <li className={styles.recipe}>
          <Image src={smoothie} alt="smoothie-image" />
          <h4>Tropical Twist</h4>
          <p>Peach, Pineapple, Apple juice</p>
        </li>
        <li className={styles.recipe}>
          <Image src={smoothie} alt="smoothie-image" />
          <h4>Protein Packer</h4>
          <p>Oats, Peanut butter, Milk, Banana, Blueberries</p>
        </li>
        <li className={styles.recipe}>
          <Image src={smoothie} alt="smoothie-image" />
          <h4>Banana Boost</h4>
          <p>Banana, Vanilla ice cream, Milk</p>
        </li>
        <li className={styles.recipe}>
          <Image src={smoothie} alt="smoothie-image" />
          <h4>Tropical Twist</h4>
          <p>Peach, Pineapple, Apple juice</p>
        </li>
        <li className={styles.recipe}>
          <Image src={smoothie} alt="smoothie-image" />
          <h4>Protein Packer</h4>
          <p>Oats, Peanut butter, Milk, Banana, Blueberries</p>
        </li>
      </ul>
    </div>
  );
};

export default smoothies;
