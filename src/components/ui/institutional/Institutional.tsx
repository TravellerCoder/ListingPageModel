import styles from './Institutional.module.css';
import { useState } from 'react';

const items = [
    {src: '/src/assets/casa-inst-1.avif', title: 'Las mejores propiedades del mercado'},
    {src: '/src/assets/casa-inst-2.webp', title: 'Asesoramiento personalizado'},
    {src: '/src/assets/casa-inst-3.webp', title: 'Acompañamiento en todo el proceso'},
];

export const Institutional = () => {

    const [index, setIndex] = useState(0);

    const next = () => setIndex((index + 1) % items.length);
    const prev = () => setIndex((index - 1 + items.length) % items.length);

  return (
    <div className={styles.institutionalContainer}>
      <div className={styles.imageContainer}>
        <img src={items[index].src} alt={items[index].title} />
        <div className={styles.textContainer}>
          <h2>{items[index].title}</h2>
        </div>
        <div className={styles.buttonContainer}>
          <button className={`${styles.carouselButton} ${styles.prev}`} onClick={prev}>{"<"}</button>
          <button className={`${styles.carouselButton} ${styles.next}`} onClick={next}>{">"}</button>
        </div>
      </div>
    </div>
  )
}
