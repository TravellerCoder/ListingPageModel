import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import styles from './EditProduct.module.css';

const CreateProduct = () => {

  const navigate = useNavigate();
  const {  addProduct } = useProducts();

  // Estados del formulario
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    price: '',
    operationType: 'Venta',
    propertyType: 'Casa',
    description: '',
    bedrooms: '',
    rooms: '',
    bathrooms: '',
    area: '',
    image: ''
  });

  const [isSaving, setIsSaving] = useState(false);

 

  useEffect(() => {
    document.title = 'Crear Producto | T.C Broker';
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Guardar cambios
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simular delay de guardado
    setTimeout(() => {
      addProduct(formData);
      setIsSaving(false);
      navigate('/admin');
    }, 500);
  };

  return (
    <div className={styles.editProductContainer}>
      <div className={styles.editProductHeader}>
        <h1>Crear Producto</h1>
        <Link to="/admin" className={styles.backButton}>
          ← Volver
        </Link>
      </div>

      <div className={styles.editProductContent}>
        {/* Columna Izquierda: Formulario */}
        <form onSubmit={handleSubmit} className={styles.formSection}>
          <h2>Información del Producto</h2>

          <div className={styles.formGroup}>
            <label htmlFor="title">Título *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Ej: Casa 3 habitaciones"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Dirección *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Ej: San Miguel de Ghiso"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="operationType">Tipo de Operación *</label>
              <select
                id="operationType"
                name="operationType"
                value={formData.operationType}
                onChange={handleChange}
                required
              >
                <option value="Venta">Venta</option>
                <option value="Alquiler">Alquiler</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="propertyType">Tipo de Propiedad *</label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
              >
                <option value="Casa">Casa</option>
                <option value="Departamento">Departamento</option>
                <option value="PH">PH</option>
                <option value="Terreno">Terreno</option>
                <option value="Comercial">Comercial</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price">Precio *</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Ej: USD 180.000"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="bedrooms">Dormitorios</label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="Ej: 3"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="rooms">Ambientes</label>
              <input
                type="number"
                id="rooms"
                name="rooms"
                value={formData.rooms}
                onChange={handleChange}
                placeholder="Ej: 5"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="bathrooms">Baños</label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="Ej: 2"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="area">Superficie</label>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Ej: 150m2"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Descripción detallada del producto..."
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">URL de Imagen</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className={styles.formActions}>
            <button 
              type="button" 
              onClick={() => navigate('/admin')}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSaving}
            >
              {isSaving ? 'Guardando...' : 'Guardar Producto'}
            </button>
          </div>
        </form>

        {/* Columna Derecha: Vista Previa */}
        <div className={styles.previewSection}>
          <h2>Vista Previa</h2>
          <div className={styles.previewCard}>
            <div className={styles.previewImage}>
              {formData.image ? (
                <img src={formData.image} alt={formData.title} />
              ) : (
                <div className={styles.noImage}>Sin imagen</div>
              )}
            </div>
            <div className={styles.previewContent}>
              <h3>{formData.title || 'Título del producto'}</h3>
              <div className={styles.previewDetails}>
                <span className={styles.previewTag}>{formData.operationType}</span>
                <span className={styles.previewTag}>{formData.propertyType}</span>
              </div>
              <p className={styles.previewPrice}>{formData.price || 'Precio'}</p>
              <p className={styles.previewAddress}>{formData.address || 'Dirección'}</p>
              
              {(formData.bedrooms || formData.bathrooms || formData.rooms || formData.area) && (
                <div className={styles.previewSpecs}>
                  {formData.bedrooms && <span>🛏️ {formData.bedrooms} dorm.</span>}
                  {formData.bathrooms && <span>🚿 {formData.bathrooms} baños</span>}
                  {formData.rooms && <span>🏠 {formData.rooms} amb.</span>}
                  {formData.area && <span>📏 {formData.area}</span>}
                </div>
              )}

              {formData.description && (
                <p className={styles.previewDescription}>
                  {formData.description.substring(0, 100)}
                  {formData.description.length > 100 && '...'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
