import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useLocation} from 'react-router-dom';
import styles from './ProductDetail.module.css';

interface Product {
  id: string;
  image?: string;
  images?: string[];        // opcional: si en el futuro agregás galería
  title: string;
  address?: string;         // hay items con "address"
  adress?: string;          // y otros con "adress"
  price: string;            // "USD 180.000" o "$500.000"
  operationType: 'Venta' | 'Alquiler' | string;
  description?: string;
  bedrooms?: string;
  rooms?: string;
  bathrooms?: string;
  area?: string;            // "150m2"
}

interface ProductsData {
  products: Product[];
}



async function fetchProductById(id: string): Promise<Product> {

  const response = await fetch('/data/D-B.json');
  const data: ProductsData = await response.json();

  // Busca el producto directamente en los datos importados
  const product = data.products.find((p) => p.id === id);
  if (product) return product;

  // Intenta buscar con el ID sin ceros iniciales
  const trimmedId = id.replace(/^0+/, '');
  if (trimmedId !== id) {
    const trimmedProduct = data.products.find((p) => p.id === trimmedId);
    if (trimmedProduct) return trimmedProduct;
  }

  throw new Error('Producto no encontrado');
  console.log('Productos disponibles', data.products);
  
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation()

  const from = (location.state as { from: string } | undefined)?.from || '/products';

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const product = await fetchProductById(id!);
        if (mounted) {
          setProduct(product);
          setActiveIndex(0);
          document.title = `${product.title ?? 'Propiedad'} | T.C Broker`;
        }
      } catch (error) {
        if (mounted) setError('No se pudo cargar el producto.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (id) loadProduct();
    return () => {
      mounted = false;
    };
  }, [id]);

  const images: string[] = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }
    return product.image ? [product.image] : [];
  }, [product]);

  const fullAddress = product?.address || product?.adress || '';

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        Cargando detalle…
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error ?? 'Producto no encontrado.'}</p>
        <Link to="/products" className={styles.errorLink}>Volver al listado</Link>
      </div>
    );
  }

  return (
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

          <div className= {styles.productDetailsGrid}>
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

          <div className={styles.productContactActions} >
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
          </div>
        </div>
      </div>
    </div>
  );
};

/* Chipcito reutilizable para los detalles */
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
