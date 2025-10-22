import { useEffect, useState } from 'react';
import styles from './AdminProducts.module.css';
import { CardProducts } from '../../components/ui/cardPrducts';

// Define la interfaz para los productos
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

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]); // Estado para todos los productos
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Estado para los productos filtrados
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  const getProducts = async () => {
        try {
          const response = await fetch('../../data/D-B.json');
          const data: Product[] = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }
    
        useEffect(() => {
            getProducts();
        }, []);

  // Actualiza el título de la página
  useEffect(() => {
    document.title = 'Administración de Productos | T.C Broker';
  }, []);

  // Filtra los productos cuando cambia el término de búsqueda
  useEffect(() => {
    const results = products.filter((product) =>
      Object.entries(product).some(([key, value]) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  return (
    <div className={styles.adminProductsContainer}>
      <h1>Bienvenido a la página de administración de productos</h1>
      <div className={styles.adminProductsContent}>
        <p>Aquí podrás gestionar todos los productos de la tienda.</p>
        <div className={styles.adminProductsButtons}>
          <button className={styles.adminButton}>Agregar Producto</button>
        </div>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchBar}
          />
        </div>
        <CardProducts product={filteredProducts || []} />
      </div>
    </div>
  );
};

export default AdminProducts;