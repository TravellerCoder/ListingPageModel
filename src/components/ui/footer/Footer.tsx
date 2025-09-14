import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <div className={styles.footerContainer}>
        <div className={styles.titleContainer}>
            <h2>T.C Brokers Inmobiliarios</h2>
        </div>

        <div className={styles.socialMediaContainer}>
            <h3>Seguinos :</h3>
            <ul className={styles.socialMediaList}>
                <li> <img src="/assets/icons8-instagram.svg" alt="Instagram" /> </li>
                <li> <img src="../../../assets/icons8-tiktok.svg" alt="TikTok" /> </li>
            </ul>
        </div>
    </div>
  )
}
