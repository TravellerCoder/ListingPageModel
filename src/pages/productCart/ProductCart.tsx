import { useEffect, useState } from 'react';
import { CardProducts } from '../../components/ui/cardPrducts';
import { useProducts } from '../../context/ProductContext.tsx';
import styles from './ProductCart.module.css'

interface Product {
  id: string;
  image?: string;
  title: string;
  address?: string; // algunos items tienen "address"
  adress?: string;  // otros tienen "adress"
  price: string;    // ej: "USD 180.000" o "$500.000"
  operationType: 'Venta' | 'Alquiler' | string;
  description?: string;
  bedrooms?: string;   // números como string
  rooms?: string;
  bathrooms?: string;  // números como string
  area?: string;       // ej: "150m2"
}

const ProductCart = () => {

  const [operationFilter, setOperationFilter] = useState<'' | 'Venta' | 'Alquiler'>('');
  const [propertyFilter, setPropertyFilter] = useState<'' | 'Casa' | 'Departamento' | 'PH' | 'Terreno' | 'Comercial'>('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [bedrooms, setBedrooms] = useState<number | ''>('');
  const [bathrooms, setBathrooms] = useState<number | ''>('');
  const [minArea, setMinArea] = useState<number | ''>('');
  
  useEffect(() => {
              document.title = "Propiedades | T.C Broker";
          }, []);
          
  const { products, loading } = useProducts();

  if (loading) {
    return <p>Cargando productos...</p>;
  }
  
        

  // Helpers de normalización
  const normalizePrice = (price?: string): number => {
    if (!price) return 0;
    // Eliminar todo lo que no sea dígito
    const digits = price.replace(/[^0-9]/g, '');
    return digits ? Number(digits) : 0;
  };

  const normalizeArea = (area?: string): number => {
    if (!area) return 0;
    const digits = area.replace(/[^0-9]/g, '');
    return digits ? Number(digits) : 0;
  };

  const toInt = (value?: string): number => {
    if (!value) return 0;
    const n = parseInt(value, 10);
    return isNaN(n) ? 0 : n;
  };

  const inferPropertyType = (p: Product): '' | 'Casa' | 'Departamento' | 'PH' | 'Terreno' | 'Comercial' => {
    const text = `${p.title} ${p.description ?? ''}`.toLowerCase();
    if (text.includes('ph')) return 'PH';
    if (text.includes('monoambiente') || text.includes('departamento')) return 'Departamento';
    if (text.includes('lote') || text.includes('terreno')) return 'Terreno';
    if (text.includes('local') || text.includes('comercial')) return 'Comercial';
    if (text.includes('casa')) return 'Casa';
    return '';
  };

  const filteredProducts = products.filter((p) => {
    // Operación (Comprar -> Venta, Alquilar -> Alquiler)
    if (operationFilter && p.operationType !== operationFilter) return false;

    // Tipo de propiedad inferido
    if (propertyFilter) {
      const type = inferPropertyType(p);
      if (type !== propertyFilter) return false;
    }

    const priceNum = normalizePrice(p.price);
    const areaNum = normalizeArea(p.area);
    const bedsNum = toInt(p.bedrooms);
    const bathsNum = toInt(p.bathrooms);

    if (minPrice !== '' && priceNum < minPrice) return false;
    if (maxPrice !== '' && priceNum > maxPrice) return false;
    if (bedrooms !== '' && bedsNum < bedrooms) return false;
    if (bathrooms !== '' && bathsNum < bathrooms) return false;
    if (minArea !== '' && areaNum < minArea) return false;

    return true;
  });

  return (
    <div className={styles.productDetailContainer}>
      <h1>Encontra aqui las mejores opciones del mercado</h1>
      <aside className={styles.productDetailAside}>
        <header  className={styles.asideHeader}>
          <h2>Que tipo de operacion estas buscando?</h2>
          <div className={styles.buttonsHeaderContainer}>
            <button
              className={styles.buttonOperation}
              onClick={() => setOperationFilter(prev => prev === 'Venta' ? '' : 'Venta')}
              aria-pressed={operationFilter === 'Venta'}
            >
              Comprar
            </button>
            <button
              className={styles.buttonOperation}
              onClick={() => setOperationFilter(prev => prev === 'Alquiler' ? '' : 'Alquiler')}
              aria-pressed={operationFilter === 'Alquiler'}
            >
              Alquilar
            </button>
          </div>
        </header>
        <main className={styles.asideMain}>
          <h2>Que tipo de propiedad estas buscando?</h2>
          <div className={styles.buttonsMainContainer}>
            <button
              className={styles.buttonHouse}
              onClick={() => setPropertyFilter(prev => prev === 'Casa' ? '' : 'Casa')}
              aria-pressed={propertyFilter === 'Casa'}
            >
              Casa
            </button>
            <button
              className={styles.buttonApartment}
              onClick={() => setPropertyFilter(prev => prev === 'Departamento' ? '' : 'Departamento')}
              aria-pressed={propertyFilter === 'Departamento'}
            >
              Departamento
            </button>
            <button
              className={styles.buttonPH}
              onClick={() => setPropertyFilter(prev => prev === 'PH' ? '' : 'PH')}
              aria-pressed={propertyFilter === 'PH'}
            >
              PH
            </button>
            <button
              className={styles.buttonLand}
              onClick={() => setPropertyFilter(prev => prev === 'Terreno' ? '' : 'Terreno')}
              aria-pressed={propertyFilter === 'Terreno'}
            >
              Terreno
            </button>
            <button
              className={styles.buttonCommercial}
              onClick={() => setPropertyFilter(prev => prev === 'Comercial' ? '' : 'Comercial')}
              aria-pressed={propertyFilter === 'Comercial'}
            >
              Comercial
            </button>
          </div>
          <div className={styles.filtersContainer}>
            <div className={styles.filter}>
              <label htmlFor="minPrice">Precio Minimo</label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => {
                  const v = e.target.value;
                  setMinPrice(v === '' ? '' : Number(v));
                }}
              /> 
            </div>
            <div className={styles.filter}>
              <label htmlFor="maxPrice">Precio Maximo</label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => {
                  const v = e.target.value;
                  setMaxPrice(v === '' ? '' : Number(v));
                }}
              />
            </div>
            <div className={styles.filter}>
              <label htmlFor="bedrooms">Dormitorios</label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                placeholder="Dormitorios"
                value={bedrooms}
                onChange={(e) => {
                  const v = e.target.value;
                  setBedrooms(v === '' ? '' : Number(v));
                }}
              />
            </div>
            <div className={styles.filter}>
              <label htmlFor="bathrooms">Baños</label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                placeholder="Baños"
                value={bathrooms}
                onChange={(e) => {
                  const v = e.target.value;
                  setBathrooms(v === '' ? '' : Number(v));
                }}
              />
            </div>
            <div className={styles.filter}>
              <label htmlFor="surface">Superficie Minima (m²)</label>
              <input
                type="number"
                id="surface"
                name="surface"
                placeholder="Superficie"
                value={minArea}
                onChange={(e) => {
                  const v = e.target.value;
                  setMinArea(v === '' ? '' : Number(v));
                }}
              />
            </div>
          </div>
          {/* <button className={styles.applyFiltersButton}>Aplicar Filtros</button> */}
        </main>
        <footer>
          {/*<button> Buscar</button> */}
        </footer>
        </aside>

        <div className={styles.productsSection}>
            <div className={styles.productsContainer}>
                {filteredProducts.length === 0 ? (
                  <p style={{ color: 'antiquewhite', gridColumn: '1 / -1', fontSize: '1.8rem', margin: '0 auto', textAlign: 'center' }}>
                    No hay resultados
                  </p>
                ) : (
                  filteredProducts.map((product) => (
                    <CardProducts key={`${product.id}-${product.title}`} product={product} />
                  ))
                )}
            </div>
        </div>
    </div>

  )
}

export default ProductCart