import { Hero } from "../../components/ui/hero"
import { useEffect } from "react"
import { CardProducts } from "../../components/ui/cardPrducts";
import { Institutional } from "../../components/ui/institutional/Institutional";
import { useProducts } from "../../context/ProductContext";
import styles from './Home.module.css'

const Home = () => {

    const { products } = useProducts();

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