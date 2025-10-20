import { useEffect } from 'react'
import styles from './AdminProducts.module.css'


const AdminProducts = () => {

    useEffect(() => {
                  document.title = "Log In | T.C Broker";
              }, []);

  return (
    <div className={styles.adminProductsContainer}>
      <h1>Bienvenido a la página de administración de productos</h1>
        <div className={styles.adminProductsContent}>
            <p>Aquí podrás gestionar todos los productos de la tienda.</p>
            <div className={styles.adminProductsButtons}>
                <button className={styles.adminButton}>Agregar Producto</button>

            </div>
        </div>

    </div>
  )
}

export default AdminProducts
