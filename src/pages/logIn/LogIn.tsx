import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth }  from '../../context/AuthContext';
import styles from './LogIn.module.css';



const LogIn = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    
    // Manejo del submit del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

    //  Válidcacion de campos vacios 

    if (!username || !password) {
        setError( 'Por favor, complete todos los campos.' );
        return;
    }

    // Validaciones de credenciales 

    const success = login(username, password);

    if (success) {
        navigate('/admin');
    } else {
        setError('Credenciales incorrectas.');
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
          <label htmlFor="username">Nombre de Usuario</label>
          <input 
            type="text" 
            id="username" 
            value={username}
            onChange={(e) => setUsername (e.target.value)} 
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
