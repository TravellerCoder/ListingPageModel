import { Hero } from "../../components/ui/hero/Hero"
import { useState, useEffect } from "react"

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

    
    return (
        <div>
            <Hero/>
        </div>
    )
}

export default Home 