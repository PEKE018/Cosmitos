import { Link } from 'react-router-dom';
import { contact, whatsappUrl } from '../data/contact';
import { routes } from '../data/site';

const footerRoutes = routes.filter((route) => route.placement === 'footer');

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__name">Cosmo</p>
          <p>Simple. Elegante. Especial.</p>
        </div>
        <nav aria-label="Información de compra">
          <ul>
            {footerRoutes.map((route) => (
              <li key={route.to}>
                <Link to={route.to}>{route.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul>
          <li>
            <a href={contact.instagramUrl} target="_blank" rel="noreferrer">
              Instagram @{contact.instagramHandle}
            </a>
          </li>
          <li>
            <a href={whatsappUrl('Hola Cosmo!')} target="_blank" rel="noreferrer">
              WhatsApp {contact.phoneLabel}
            </a>
          </li>
          <li>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
        </ul>
      </div>
      <p className="site-footer__legal">© {new Date().getFullYear()} Cosmo Accesorios</p>
    </footer>
  );
}
