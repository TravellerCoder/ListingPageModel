import styles from './Hero.module.css';

export const Hero = () => {
  return (
    <div className={styles.heroContainer}> 
            <img src="/src/assets/Casa-moderna-un-piso.jpg" className={styles.heroBg} alt="Hero" />
            <div className={styles.heroTexting}>
                <h1>T.C Broker Inmobiliario</h1>
                <p>Experiencia y confianza para tu próxima operación inmobiliaria.</p>
                <button>Contactate</button>
            </div>
        </div>
  )
}