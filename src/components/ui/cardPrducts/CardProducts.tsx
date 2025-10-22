import styles from './CardProduct.module.css';
import { Link, useLocation } from 'react-router-dom';

interface Product {
  id: string;
  image: string;
  title: string;
  address: string;
  price: string;
  operationType: string;
  propertyType: string;
  description: string;
  bedrooms: string;
  rooms: string;
  bathrooms: string;
  area: string;
}
interface CardProductProps {
  product: Product;
  isAdmin?: boolean;
}

export const CardProducts = ({ product, isAdmin = false } : CardProductProps) => {
  const location = useLocation();
  return (
    <div className={styles.productContainer}>
        <img src={product.image} alt={product.title} />
        <div className={styles.infoProduct}>
            <h2>{product.title}</h2>
            <div className={styles.detailsProduct}>
                <p>{product.operationType}</p>
                <p>{product.price}</p>
                <p>{product.address}</p>
                <p>{product.description} </p>
            </div>
            <Link 
              to={`/detail/${product.id}`} 
              state={{ from: location.pathname }}
              className={styles.button}>Ver mas</Link>

            {isAdmin && (
              <div className={styles.adminButtons}>
                <button className={styles.button}>Modificar</button>
                <button className={styles.button}>Eliminar</button>
              </div>
            )}
        </div>
    </div>
  )
}
