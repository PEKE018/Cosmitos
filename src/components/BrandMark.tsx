import { asset } from '../data/assets';

type BrandMarkProps = {
  className?: string;
  large?: boolean;
};

export default function BrandMark({ className = '', large = false }: BrandMarkProps) {
  return (
    <img
      className={`brand-mark${large ? ' brand-mark--large' : ''} ${className}`.trim()}
      src={asset('photos/45709013a5162fe97071992f39d06d9c.png')}
      alt="Cosmo"
    />
  );
}
