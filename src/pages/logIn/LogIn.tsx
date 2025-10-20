import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LogIn.module.css';



const LogIn = () => {

    const [email, setEmail] = useState<string >('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Definicion de credenciales 

    const validOnlyAdminMail = "admin@admin.com"; 
    const validOnlyAdminPassword = "admin123";

    // Manejo del submit del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

    //  Válidcacion de campos vacios 

    if (!email || !password) {
        setError( 'Por favor, complete todos los campos.' );
        return;
    }

    // Validaciones de credenciales 

    if ( email === validOnlyAdminMail && password === validOnlyAdminPassword) {
        // Credenciales correctas redireccionan al admin page 
        navigate('/admin');
    } else {
        // Credenciales incorrectas muestran error 
        setError( 'Credenciales incorrectas.' );
    }
    };

    useEffect(() => {
                  document.title = "Log In | T.C Broker";
              }, []);

  return (
    <div className={styles.logInContainer}>
      <h1>Bienvenido al administrador del sitio</h1>
      <form className={styles.logInForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Correo Electrónico</label>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail (e.target.value)} 
            />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword (e.target.value)}
            />
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button type="submit" onClick={handleSubmit}>Iniciar Sesión</button>
      </form>
    </div>
  )
}

export default LogIn
