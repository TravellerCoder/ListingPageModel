import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LayoutMain } from './components/layouts/LayoutMain.tsx'
import { ProductsProvider } from './context/ProductContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { ProtectedRoutes } from './components/protectedRoutes/ProtectedRoutes.tsx'  
import ProductCart from './pages/productCart/ProductCart.tsx'
import ProductDetail from './pages/productDetail/ProductDetail.tsx'
import Home from './pages/home/Home.tsx'
import AboutUs from './pages/aboutUs/AboutUs.tsx'
import Contact from './pages/contact/Contact.tsx'
import LogIn from './pages/logIn/LogIn.tsx'
import AdminProducts from './pages/adminProducts/AdminProducts.tsx'
import EditProduct from './pages/editProducts/EditProduct.tsx'
import CreateProduct from './pages/createProducts/CreateProduct.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMain />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <ProductCart />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/detail/:id",
        element: <ProductDetail />,
      },
      { 
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoutes>
            <AdminProducts />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/admin/edit/:id",
        element: (
          <ProtectedRoutes>
            <EditProduct />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/admin/create",
        element: (
          <ProtectedRoutes>
            <CreateProduct />
          </ProtectedRoutes>
        ),
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <RouterProvider router={router} />
      </ProductsProvider>
    </AuthProvider>
  </StrictMode>,
)
