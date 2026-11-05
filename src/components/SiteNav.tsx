import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navigation } from '../data/site';
import { useCart } from '../context/CartContext';

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="site-header">
      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`site-nav${open ? ' is-open' : ''}`} aria-label="Navegación principal">
        {navigation.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
        <NavLink
          className="cart-nav-link"
          to="/carrito"
          aria-label={`Carrito de compras, ${itemCount} ${itemCount === 1 ? 'producto' : 'productos'}`}
          onClick={() => setOpen(false)}
        >
          Carrito <span>{itemCount}</span>
        </NavLink>
      </nav>
    </header>
  );
}
