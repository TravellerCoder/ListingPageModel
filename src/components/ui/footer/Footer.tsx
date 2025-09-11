import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <div className={styles.footerContianer}>
        <div className="logoFooter">
            <h2>T.C Brokers Inmobiliarios</h2>
        </div>

        <div className={styles.socialMediaContainer}>
            <h3>Seguinos :</h3>
            <ul className={styles.socialMediaList}>
                <li>Instagram</li>
                <li>Facebook</li>
            </ul>
        </div>
    </div>
  )
}
