import { createContext, useContext, useState, useEffect, } from 'react';
import type { ReactNode } from 'react';

export interface Product {
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

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos al inicio
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const savedProducts = localStorage.getItem('products');
        
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        } else {
          const response = await fetch('/data/D-B.json');
          const data = await response.json();
          setProducts(data.products);
          localStorage.setItem('products', JSON.stringify(data.products));
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Guardar en localStorage cuando cambian
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const id = String(Math.max(...products.map(p => parseInt(p.id) || 0)) + 1).padStart(2, '0');
    const productWithId = { ...newProduct, id };
    setProducts(prev => [...prev, productWithId]);
  };

  const updateProduct = (id: string, updatedData: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updatedData } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider');
  }
  return context;
};