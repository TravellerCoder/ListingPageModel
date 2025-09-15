import styles from './AboutUs.module.css'


const AboutUs = () => {
  return (
    <div className={styles.aboutUsContainer}>
        <h1>Tu mejor opción inmobiliaria</h1>
        <div className={styles.textContainer}>
            <p>
                En T.C Broker Inmobiliario nos especializamos en conectar personas con las propiedades que mejor se ajustan a sus necesidades y objetivos. 
                Nuestra misión es brindar un servicio inmobiliario transparente, ágil y personalizado, acompañando a cada cliente en todo el proceso de compra, venta o alquiler.
            </p>
            <p>
                Contamos con un equipo de profesionales con amplia experiencia en el mercado y un profundo conocimiento de las zonas en las que trabajamos. 
                Esto nos permite asesorar de manera estratégica, ya sea que estés buscando tu próximo hogar, un espacio comercial o una oportunidad de inversión.
            </p>
            <p>
                En T.C Broker Inmobiliario creemos que cada operación inmobiliaria es única. Por eso, ponemos el foco en la confianza, la comunicación clara y el compromiso, 
                para que cada paso sea seguro y sencillo.
            </p>
        </div>
    </div>
  )
}

export default AboutUs