import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from '../modal';
import styles from './CardProduct.module.css';

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
  onDelete?: (id: string) => void;
}

export const CardProducts = 
({ product, isAdmin = false, onDelete }: CardProductProps) => {
  const location = useLocation();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete?.(product.id);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const navigate = useNavigate();

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
              state={{ from: location.pathname, isAdmin }}
              className={styles.button}>Ver mas</Link>

            {isAdmin && (
              <div className={styles.adminButtons}>
                <button 
                  className={styles.button}
                  onClick={() => navigate(`/edit-product/${product.id}`)}
                  >
                    Modificar
                  </button>
                  <button 
                    className={styles.button}
                    onClick={handleDeleteClick}
                  >
                    Eliminar
                  </button>
              </div>
            )}
        </div>
        <Modal
        isOpen={showDeleteModal}
        title="Eliminar Producto"
        message={`¿Estás seguro que deseas eliminar "${product.title}"? Esta acción no se puede deshacer.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
      />
    </div>
  )
}
