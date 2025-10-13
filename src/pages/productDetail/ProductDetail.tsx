import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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

const BASE_URL = 'http://localhost:3001';

async function fetchProductById(id: string): Promise<Product> {
  // Try direct fetch by ID
  let response = await fetch(`${BASE_URL}/products/${encodeURIComponent(id)}`);
  if (response.ok) return await response.json();

  // Try fetching by query parameter (handles duplicates)
  response = await fetch(`${BASE_URL}/products?id=${encodeURIComponent(id)}`);
  if (response.ok) {
    const products = await response.json();
    if (Array.isArray(products) && products.length > 0) return products[0];
  }

  // Try with ID without leading zeros
  const trimmedId = id.replace(/^0+/, '');
  if (trimmedId !== id) {
    response = await fetch(`${BASE_URL}/products/${encodeURIComponent(trimmedId)}`);
    if (response.ok) return await response.json();

    response = await fetch(`${BASE_URL}/products?id=${encodeURIComponent(trimmedId)}`);
    if (response.ok) {
      const products = await response.json();
      if (Array.isArray(products) && products.length > 0) return products[0];
    }
  }

  throw new Error('Producto no encontrado');
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

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
      <div style={{ maxWidth: 1100, margin: '40px auto', padding: 16, color: 'antiquewhite' }}>
        Cargando detalle…
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ maxWidth: 1100, margin: '40px auto', padding: 16, color: 'antiquewhite' }}>
        <p style={{ marginBottom: 16 }}>{error ?? 'Producto no encontrado.'}</p>
        <Link to="/products" style={{ color: '#61dafb' }}>Volver al listado</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: '24px auto', padding: '0 16px', color: 'antiquewhite' }}>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {/* Columna izquierda: imágenes */}
        <div style={{ flex: '1 1 520px', minWidth: 320 }}>
          <div style={{
            width: '100%',
            aspectRatio: '16 / 9',
            background: '#1f1f1f',
            borderRadius: 8,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {images.length > 0 ? (
              <img
                src={images[Math.min(activeIndex, images.length - 1)]}
                alt={product.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{ opacity: 0.7 }}>Sin imagen</span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto', paddingBottom: 4 }}>
              {images.map((src, idx) => (
                <button
                  key={src + idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-pressed={activeIndex === idx}
                  style={{
                    border: activeIndex === idx ? '2px solid #ffd27f' : '2px solid transparent',
                    borderRadius: 6,
                    padding: 0,
                    cursor: 'pointer',
                    background: 'transparent'
                  }}
                  title={`Foto ${idx + 1}`}
                >
                  <img
                    src={src}
                    alt={`Miniatura ${idx + 1}`}
                    style={{
                      width: 80,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: 4,
                      display: 'block'
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Columna derecha: datos */}
        <div style={{ flex: '1 1 400px', minWidth: 300 }}>
          <h1 style={{ margin: '0 0 12px', fontSize: 28 }}>{product.title}</h1>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
            <span style={{ background: '#2d2d2d', padding: '6px 10px', borderRadius: 999, fontSize: 14 }}>
              {product.operationType}
            </span>
            {product.area && (
              <span style={{ background: '#2d2d2d', padding: '6px 10px', borderRadius: 999, fontSize: 14 }}>
                {product.area}
              </span>
            )}
          </div>

          {fullAddress && (
            <p style={{ margin: '8px 0 12px', opacity: 0.9 }}>
              {fullAddress}
            </p>
          )}

          <p style={{ margin: '8px 0 16px', fontSize: 22, fontWeight: 700 }}>
            {product.price}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 10,
            marginBottom: 16
          }}>
            {product.bedrooms && <DetailChip label="Dormitorios" value={product.bedrooms} />}
            {product.bathrooms && <DetailChip label="Baños" value={product.bathrooms} />}
            {product.rooms && <DetailChip label="Ambientes" value={product.rooms} />}
            {product.area && <DetailChip label="Superficie" value={product.area} />}
          </div>

          {product.description && (
            <>
              <h2 style={{ margin: '16px 0 8px', fontSize: 20 }}>Descripción</h2>
              <p style={{ lineHeight: 1.6, opacity: 0.95 }}>{product.description}</p>
            </>
          )}

          <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Hola, me interesa la propiedad: ${product.title} (${product.price}).`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#25D366',
                color: '#000',
                padding: '10px 14px',
                borderRadius: 8,
                textDecoration: 'none',
                fontWeight: 700
              }}
            >
              Consultar por WhatsApp
            </a>
            <Link
              to="/products"
              style={{
                background: '#2d2d2d',
                color: 'antiquewhite',
                padding: '10px 14px',
                borderRadius: 8,
                textDecoration: 'none',
                fontWeight: 600
              }}
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
