import { useEffect, useState } from "react";
import styles from './Contact.module.css'

const Contact = () => {

    const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
});

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };    

        useEffect(() => {
            document.title = "Contacto | T.C Broker";
        }, []);

        const handleSubmit = (e) => {
            e.preventDefault();

            // Validación simple
            if (!formData.name || !formData.email || !formData.message) {
                setStatus("Por favor completá todos los campos.");
                return;
            }

            setStatus("¡Mensaje enviado con éxito!\nMuy pronto uno de nuestros agentes se pondrá en contacto con vos.");
            setFormData({ name: "", email: "", message: "" });
        }

return (
    <div className={styles.contactContainer}>
        <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="bg Imagen"
            className={styles.bgImage} />
        <div className={styles.formContainer}>
            <h1>Contactanos</h1>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                    Nombre
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className= {styles.formInput}
                    placeholder="Tu nombre"
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="tuemail@ejemplo.com"
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>
                    Mensaje
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.formTextarea}
                    placeholder="Escribí tu mensaje..."
                ></textarea>
        </div>

        <button type="submit" className={styles.submitButton}>
          Enviar
        </button>
      </form>
      {status && (
        <p className={styles.statusMessage}>{status}</p>
      )}
        </div>
    </div>
  )
}

export default Contact

