import styles from './hero.module.css';

export const Hero = () => {
  return (
    <div className={styles.heroContainer}> 
            <div className={styles.institutional}>
                <h1>T.C Listing Page</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                <button>Get Started</button>
            </div>
        </div>
  )
}