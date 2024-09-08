import React from "react";
import styles from "./Card.module.css";
import { Cat } from "../../interface";

interface CardProps {
  openImage: (type: string) => void;
  cat: Cat;
}

const Card: React.FC<CardProps> = ({ openImage, cat }) => {
  return (
    <div className={`${styles.card}`} onClick={() => openImage(cat.imageSrc)}>
      <>
        <img
          src={cat.imageSrc}
          alt={cat.title}
          className={`${styles.thumbnail}`}
        />

        <h3>{cat.title}</h3>
      </>
    </div>
  );
};

export default Card;
