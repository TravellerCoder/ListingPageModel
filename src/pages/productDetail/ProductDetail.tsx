import styles from './ProductDetail.module.css'


const ProductDetail = () => {
  return (
    <div className={styles.productDetailContainer}>
      <h1>Que tipo de propiedad estas buscando?</h1>
      <aside className={styles.productDetailAside}>
        <header  className={styles.asideHeader}>
          <h2>Que tipo de operacion estas buscando?</h2>
          <div className={styles.buttonsContainer}>
            <button className={styles.buttonBuy}>Comprar</button>
            <button className={styles.buttonRent}>Alquilar</button>
          </div>
        </header>
        <main className={styles.asideMain}>
          <h2>Que tipo de propiedad estas buscando?</h2>
          <div className={styles.buttonsContainer}>
            <button className={styles.buttonHouse}>Casa</button>
            <button className={styles.buttonApartment}>Departamento</button>
            <button className={styles.buttonPH}>PH</button>
            <button className={styles.buttonLand}>Terreno</button>
            <button className={styles.buttonCommercial}>Comercial</button>
          </div>
          <div className={styles.filtersContainer}>
            <div className={styles.filter}>
              <label htmlFor="minPrice">Precio Minimo</label>
              <input type="number" id="minPrice" name="minPrice" placeholder="Min" /> 
            </div>
            <div className={styles.filter}>
              <label htmlFor="maxPrice">Precio Maximo</label>
              <input type="number" id="maxPrice" name="maxPrice" placeholder="Max" />
            </div>
            <div className={styles.filter}>
              <label htmlFor="bedrooms">Dormitorios</label>
              <input type="number" id="bedrooms" name="bedrooms" placeholder="Dormitorios" />
            </div>
            <div className={styles.filter}>
              <label htmlFor="bathrooms">Baños</label>
              <input type="number" id="bathrooms" name="bathrooms" placeholder="Baños" />
            </div>
            <div className={styles.filter}>
              <label htmlFor="surface">Superficie Minima (m²)</label>
              <input type="number" id="surface" name="surface" placeholder="Superficie" />
            </div>
          </div>
          <button className={styles.applyFiltersButton}>Aplicar Filtros</button>
        </main>
        <footer>
          <button> Buscar</button>
        </footer>
        </aside>
    </div>

  )
}

export default ProductDetail