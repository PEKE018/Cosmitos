import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import SiteNav from './components/SiteNav';
import BestSellersPage from './pages/BestSellersPage';
import ClientsPage from './pages/ClientsPage';
import CartPage from './pages/CartPage';
import CombosPage from './pages/CombosPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import HechosParaTiPage from './pages/HechosParaTiPage';
import HomePage from './pages/HomePage';
import IntroPage from './pages/IntroPage';
import ShippingPage from './pages/ShippingPage';
import ValuesPage from './pages/ValuesPage';

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    const pageTitle = pathname === '/' ? 'Inicio' : navigationTitle(pathname);
    document.title = `${pageTitle} | Cosmo Accesorios`;
  }, [pathname]);

  return (
    <>
      <SiteNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/entrada" element={<IntroPage />} />
        <Route path="/mas-vendidos" element={<BestSellersPage />} />
        <Route path="/precios" element={<HechosParaTiPage />} />
        <Route path="/hechos-para-ti" element={<HechosParaTiPage />} />
        <Route path="/combos" element={<CombosPage />} />
        <Route path="/envos-y-devoluciones" element={<ShippingPage />} />
        <Route path="/preguntas-frecuentes" element={<FaqPage />} />
        <Route path="/lo-que-nos-define" element={<ValuesPage />} />
        <Route path="/clientes" element={<ClientsPage />} />
        <Route path="/contactos" element={<ContactPage />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}

function navigationTitle(pathname: string) {
  const titles: Record<string, string> = {
    '/entrada': 'entrada',
    '/mas-vendidos': 'Mas vendidos',
    '/precios': 'Hechos para ti',
    '/hechos-para-ti': 'Hechos para ti',
    '/combos': 'Combos',
    '/envos-y-devoluciones': 'Envíos y devoluciones',
    '/preguntas-frecuentes': 'Preguntas Frecuentes',
    '/lo-que-nos-define': 'Lo que nos define',
    '/clientes': 'Clientes',
    '/contactos': 'Contactos',
    '/carrito': 'Carrito',
  };

  return titles[pathname] ?? 'Inicio';
}
