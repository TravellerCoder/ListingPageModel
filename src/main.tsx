import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LayoutMain } from './components/layouts/LayoutMain.tsx'
import ProductDetail from './pages/productDetail/ProductDetail.tsx'
import Home from './pages/home/Home.tsx'
import AboutUs from './pages/aboutUs/AboutUs.tsx'
import Contact from './pages/contact/Contact.tsx'
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
        element: <ProductDetail />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
