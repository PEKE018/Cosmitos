import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { routes } from '../data/site';
import { useCart } from '../context/CartContext';

const headerRoutes = routes.filter((route) => route.placement === 'header');

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <button
        className="skip-link"
        type="button"
        onClick={() => document.getElementById('contenido')?.focus()}
      >
        Saltar al contenido
      </button>
      <div className="site-header__bar">
        <Link className="site-header__brand" to="/">
          Cosmo
        </Link>

        <nav
          id="site-nav"
          className={`site-nav${open ? ' is-open' : ''}`}
          aria-label="Navegación principal"
        >
          {headerRoutes.map((route) => (
            <NavLink key={route.to} to={route.to}>
              {route.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <NavLink
            className="cart-link"
            to="/carrito"
            aria-label={`Carrito de compras, ${itemCount} ${itemCount === 1 ? 'producto' : 'productos'}`}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 8h14l-1 12H6L5 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {itemCount > 0 && <span className="cart-link__count" aria-hidden="true">{itemCount}</span>}
          </NavLink>
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
