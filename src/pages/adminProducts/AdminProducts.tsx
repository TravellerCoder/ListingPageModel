import { useEffect, useState, } from 'react';
import { CardProducts } from '../../components/ui/cardPrducts';
import { useProducts } from '../../context/ProductContext';
import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './AdminProducts.module.css';


const AdminProducts = () => {

  const { products, loading } = useProducts();
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [filteredProducts, setFilteredProducts] = useState(products); // Estado para los productos filtrados
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Actualiza el título de la página
  useEffect(() => {
    document.title = 'Administración de Productos | T.C Broker';
  }, []);

  
  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  
  // Filtra los productos cuando cambia el término de búsqueda
  useEffect(() => {
    const results = products.filter((product) =>
      Object.entries(product).some(([_key, value]) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );


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
        <button onClick={handleLogout} className={styles.logoutButton}>
          Cerrar Sesión
        </button>
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