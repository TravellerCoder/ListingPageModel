import { useEffect, useState } from 'react';
import { CardProducts } from '../../components/ui/cardPrducts';
import { useProducts } from '../../context/ProductContext';
import { Link } from 'react-router';
import styles from './AdminProducts.module.css';


const AdminProducts = () => {

  const { products, loading, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [filteredProducts, setFilteredProducts] = useState(products); // Estado para los productos filtrados

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

    const handleDelte = (id: string) => {
      deleteProduct(id);
    }

    const handleEdit = (id: string) => {
      console.log('Editar producto con ID:', id);
    }

    setFilteredProducts(results);
  }, [searchTerm, products]);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div className={styles.adminProductsContainer}>
      <h1>Bienvenido a la página de administración de productos</h1>
      <div className={styles.adminProductsContent}>
        <p>Aquí podrás gestionar todos los productos de la tienda.</p>
        <div className={styles.adminProductsButtons}>
          <Link to="/admin/create" className={styles.adminButton}>
            Agregar Producto
          </Link>
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
      </div>

      <div className={styles.productsGrid}>
        {filteredProducts.length === 0 ? (
          <p>No se encontraron productos</p>
        ) : (
          filteredProducts.map((product) => (
            <CardProducts key={product.id} product={product} isAdmin={true} />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminProducts;