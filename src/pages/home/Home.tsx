import { Hero } from "../../components/ui/hero"
import { useState, useEffect } from "react"
import styles from './Home.module.css'
import { CardProducts } from "../../components/ui/cardPrducts";
import { Institutional } from "../../components/ui/institutional/Institutional";

const Home = () => {

    /* Fetch productos desde la api */
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const response = await fetch('http://localhost:3001/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

      useEffect(() => {
            document.title = "Inicio | T.C Broker";
        }, []);

    
    return (
        <div>
            <Hero/>
            <h2>Propiedades destacadas del mes</h2>
            <div className={styles.productsContainer}>
                {products
                .slice(0, 5)
                .map((product) => (
                    <CardProducts key={product.id} product={product} />
                ))}
            </div>
            <Institutional />
        </div>
    )
}

export default Home 