import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';


export const NavBar = () => {
  return (
    <div className={styles.navBarContainer}>
        <div className={styles.logo}>  
            <Link to="/">T.C Broker Inmobiliario</Link>
        </div>
        <div className={styles.navLinks}>
            <Link to="/products">Propiedades</Link>
            <Link to="/about">Quienes Somos</Link>
            <Link to="/contact">Contacto</Link>
        </div>
    </div>
    )
}
