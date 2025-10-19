import styles from './LogIn.module.css';

const LogIn = () => {



  return (
    <div className={styles.logInContainer}>
      <h1>Bienvenido al administrador del sitio</h1>
      <form className={styles.logInForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  )
}

export default LogIn
