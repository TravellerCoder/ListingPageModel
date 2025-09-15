import styles from './NavBar.module.css';

export const NavBar = () => {
  return (
    <div className={styles.navBarContainer}>
        <div className={styles.logo}>  
            T.C Broker Inmobiliario
        </div>
        <div className={styles.navLinks}>
            <a href="/">Propiedades</a>
            <a href="/about">Quienes Somos</a>
            <a href="/contact">Contacto</a>
        </div>
    </div>
    )
}
