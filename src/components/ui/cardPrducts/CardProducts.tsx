import styles from './CardProduct.module.css';


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
            <button>Ver mas</button>    
        </div>
    </div>
  )
}
