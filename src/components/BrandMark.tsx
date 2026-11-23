import { asset } from '../data/assets';

type BrandMarkProps = {
  className?: string;
};

/** Logo de Cosmo (letras blancas): usarlo sobre fondos oscuros, como la banda taupe. */
export default function BrandMark({ className = '' }: BrandMarkProps) {
  return (
    <img
      className={`brand-mark ${className}`.trim()}
      src={asset('photos/5b8b4a38cd132157fbb3b76bc7ad4e4c.png')}
      alt="Cosmo Accesorios"
    />
  );
}
