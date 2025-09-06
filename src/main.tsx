import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import { LayoutMain } from './components/layouts/LayoutMain.tsx'
import ProductDetail from './pages/productDetail/ProductDetail.tsx'
import Home from './pages/home/Home.tsx'
import './index.css'
import App from './App.tsx'

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
        path: "/detail",
        element: <ProductDetail />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
