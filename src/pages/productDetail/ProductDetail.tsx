import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { Modal } from '../../components/ui/modal';
import styles from './ProductDetail.module.css';




const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { products, loading: productsLoading, deleteProduct } = useProducts();
  
  // Determina la ruta de regreso
  const from = (location.state as { from: string } | undefined)?.from || '/products';
  const isAdmin = (location.state as { isAdmin: boolean } | undefined)?.isAdmin || false;

  const [activeIndex, setActiveIndex] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ✅ Buscar el producto directamente desde products
  const product = useMemo(() => {
    if (!id || !products.length) return null;
    
    // Busca por ID exacto
    let found = products.find((p) => p.id === id);
    if (found) return found;
    
    // Intenta sin ceros iniciales
    const trimmedId = id.replace(/^0+/, '');
    if (trimmedId !== id) {
      found = products.find((p) => p.id === trimmedId);
    }
    
    return found || null;
  }, [id, products]);

  // ✅ Actualizar título cuando cambia el producto
  useEffect(() => {
    if (product) {
      document.title = `${product.title ?? 'Propiedad'} | T.C Broker`;
    }
  }, [product]);

  const images: string[] = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }
    return product.image ? [product.image] : [];
  }, [product]);

  const fullAddress = product?.address || product?.adress || '';

  // ✅ Manejar eliminación de producto
  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (product) {
      deleteProduct(product.id);
      setShowDeleteModal(false);

      window.location.href = '/admin'; // Redirigir al listado
    };
  };
    const handleCancelDelete = () => {
      setShowDeleteModal(false);
    };

    const navigate = useNavigate();

    const handleEdit = () => {
      if (product) {
      navigate(`/admin/edit/${product.id}`);
      }
    }
  
  // ✅ Mostrar loading mientras cargan los productos
  if (productsLoading) {
    return (
      <div className={styles.loadingContainer}>
        Cargando detalle…
      </div>
    );
  }

  // ✅ Mostrar error si no se encuentra el producto
  if (!product) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>Producto no encontrado.</p>
        <Link to={from} className={styles.errorLink}>Volver al listado</Link>
      </div>
    );
  }

  return (
  <>
    <div className={styles.productDetailContainer}>
      <div className={styles.productDetailContent}>
        {/* Columna izquierda: imágenes */}
        <div className={styles.productImagesContainer}>
          <div className={styles.mainImageContainer}>
            {images.length > 0 ? (
              <img
                src={images[Math.min(activeIndex, images.length - 1)]}
                alt={product.title}
              />
            ) : (
              <span>Sin imagen</span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className={styles.thumbnailsContainer}>
              {images.map((src, idx) => (
                <button
                  key={src + idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-pressed={activeIndex === idx}
                  className={`${styles.thumbnailButton} ${activeIndex === idx ? styles.thumbnailButtonActive : ''}`}  
                  title={`Foto ${idx + 1}`}
                >
                  <img
                    src={src}
                    alt={`Miniatura ${idx + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Columna derecha: datos */}
        <div className={styles.productDataContainer}>
          <h1>{product.title}</h1>
          <div className={styles.productInfoTags}>
            <span className={styles.productInfoTag}>
              {product.operationType}
            </span>
          </div>

          {fullAddress && (
            <p className={styles.productName}>
              {fullAddress}
            </p>
          )}

          <p className={styles.productPrice}>
            {product.price}
          </p>

          <div className={styles.productDetailsGrid}>
            {product.bedrooms && <DetailChip label="Dormitorios" value={product.bedrooms} />}
            {product.bathrooms && <DetailChip label="Baños" value={product.bathrooms} />}
            {product.rooms && <DetailChip label="Ambientes" value={product.rooms} />}
            {product.area && <DetailChip label="Superficie" value={product.area} />}
          </div>

          {product.description && (
            <>
              <h2 className={styles.productDescriptionTitle}>Descripción</h2>
              <p className={styles.productDescriptionText}>{product.description}</p>
            </>
          )}

          <div className={styles.productContactActions}>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Hola, me interesa la propiedad: ${product.title} (${product.price}).`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappLink}
            >
              Consultar por WhatsApp
            </a>
            
            <Link
              to={from}
              className={styles.backToListLink}
            >
              Volver al listado
            </Link>

            {/* ✅ Botones de admin - solo si isAdmin es true */}
            {isAdmin && (
              <div className={styles.adminActions}>
                <button 
                  onClick={handleEdit}
                  className={styles.editButton}
                >
                  Modificar
                </button>
                <button 
                  onClick={handleDelete}
                  className={styles.deleteButton}
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* ✅ Modal de confirmación */}
    <Modal
      isOpen={showDeleteModal}
      title="Eliminar Producto"
      message={`¿Estás seguro que deseas eliminar "${product.title}"? Esta acción no se puede deshacer.`}
      onConfirm={handleConfirmDelete}
      onCancel={handleCancelDelete}
      confirmText="Sí, eliminar"
      cancelText="Cancelar"
    />
  </>
);
};

/* Chipcito reutilizable para    los detalles */
const DetailChip = ({ label, value }: { label: string; value: string }) => (
  <div style={{
    background: '#2d2d2d',
    borderRadius: 8,
    padding: '10px 12px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10
  }}>
    <span style={{ opacity: 0.8 }}>{label}</span>
    <strong>{value}</strong>
  </div>
);

export default ProductDetail;