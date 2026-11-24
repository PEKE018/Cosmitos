import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import SiteFooter from './components/SiteFooter';
import SiteNav from './components/SiteNav';
import { routes } from './data/site';
import BestSellersPage from './pages/BestSellersPage';
import CartPage from './pages/CartPage';
import ClientsPage from './pages/ClientsPage';
import CombosPage from './pages/CombosPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import HechosParaTiPage from './pages/HechosParaTiPage';
import HomePage from './pages/HomePage';
import IntroPage from './pages/IntroPage';
import ReturnsPage from './pages/ReturnsPage';
import ShippingPage from './pages/ShippingPage';
import ValuesPage from './pages/ValuesPage';

const pageTitles: Record<string, string> = {
  ...Object.fromEntries(routes.map((route) => [route.to, route.title])),
  '/carrito': 'Carrito',
};

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    const pageTitle = pageTitles[pathname];
    document.title = pageTitle ? `${pageTitle} | Cosmo Accesorios` : 'Cosmo Accesorios';
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <SiteNav />
      <main id="contenido" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/entrada" element={<IntroPage />} />
          <Route path="/mas-vendidos" element={<BestSellersPage />} />
          <Route path="/hechos-para-ti" element={<HechosParaTiPage />} />
          <Route path="/combos" element={<CombosPage />} />
          <Route path="/envios-y-devoluciones" element={<ShippingPage />} />
          <Route path="/preguntas-frecuentes" element={<FaqPage />} />
          <Route path="/lo-que-nos-define" element={<ValuesPage />} />
          <Route path="/clientes" element={<ClientsPage />} />
          <Route path="/contactos" element={<ContactPage />} />
          <Route path="/devoluciones" element={<ReturnsPage />} />
          <Route path="/carrito" element={<CartPage />} />
          {/* Rutas anteriores: se mantienen para que los links ya compartidos sigan funcionando */}
          <Route path="/precios" element={<Navigate to="/hechos-para-ti" replace />} />
          <Route path="/envos-y-devoluciones" element={<Navigate to="/envios-y-devoluciones" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  );
}
