import styles from './hero.module.css';

export const Hero = () => {
  return (
    <div className={styles.heroContainer}> 
            <img src="/src/assets/Casa-moderna-un-piso.jpg" className={styles.heroBg} alt="Hero" />
            <div className={styles.heroTexting}>
                <h1>T.C Listing Page</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                <button>Get Started</button>
            </div>
        </div>
  )
}