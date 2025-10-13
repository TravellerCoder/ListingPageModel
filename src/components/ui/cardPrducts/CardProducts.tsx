import styles from './CardProduct.module.css';
import { Link } from 'react-router-dom';


export const CardProducts = ({ product }) => {
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
            <Link to={`/detail/${product.id}`} className={styles.button}>Ver mas</Link>
        </div>
    </div>
  )
}
