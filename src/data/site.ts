import { formatCurrency } from './pricing';
import { shippingSettings } from './shipping';

export type SiteProduct = {
  /** Identificador estable: se usa en el carrito guardado del navegador. */
  id: string;
  name: string;
  image: string;
  details: string[];
  /** Precio en pesos argentinos, número entero. Sin precio = "consultar". */
  price?: number;
  /** Peso en gramos (para calcular el envío). Si falta se usa `shippingSettings.defaultItemGrams`. */
  weightGrams?: number;
  /** Solo se vende junto con otra compra (cross-selling). */
  requiresPurchase?: boolean;
};

export type SiteRoute = {
  label: string;
  to: string;
  title: string;
  placement: 'header' | 'footer';
};

export const routes: SiteRoute[] = [
  { label: 'Más vendidos', to: '/mas-vendidos', title: 'Más vendidos', placement: 'header' },
  { label: 'Hechos para ti', to: '/hechos-para-ti', title: 'Hechos para ti', placement: 'header' },
  { label: 'Combos', to: '/combos', title: 'Combos', placement: 'header' },
  { label: 'Nosotros', to: '/entrada', title: 'Nosotros', placement: 'header' },
  { label: 'Opiniones', to: '/clientes', title: 'Opiniones', placement: 'header' },
  { label: 'Contacto', to: '/contactos', title: 'Contacto', placement: 'header' },
  { label: 'Envíos y devoluciones', to: '/envios-y-devoluciones', title: 'Envíos y devoluciones', placement: 'footer' },
  { label: 'Devolver un producto', to: '/devoluciones', title: 'Devolver un producto', placement: 'footer' },
  { label: 'Preguntas frecuentes', to: '/preguntas-frecuentes', title: 'Preguntas frecuentes', placement: 'footer' },
  { label: 'Lo que nos define', to: '/lo-que-nos-define', title: 'Lo que nos define', placement: 'footer' },
];

export const bestSellers: SiteProduct[] = [
  {
    id: 'ajustador-de-cintura',
    weightGrams: 60,
    name: 'Ajustador de cintura',
    image: 'ce7dba79e1c386428b91c07bbd7303f2.webp',
    details: ['Conejo', 'Colores: blanco y negro', 'Para niños'],
    price: 3500,
  },
  {
    id: 'aros-colgantes-de-perla',
    weightGrams: 15,
    name: 'Aros colgantes de perla',
    image: 'ddcb710297f2e382f86d45679a309417.webp',
    details: ['Color dorado', 'Talle chico'],
    price: 3200,
  },
  {
    id: 'anillo-espiral',
    weightGrams: 12,
    name: 'Anillo espiral',
    image: '64befa1837d9fa938166b4506fbcbacf.webp',
    details: ['Color dorado', 'Talle 18'],
    price: 2400,
  },
  {
    id: 'aros-de-perlas',
    weightGrams: 10,
    name: 'Aros de perlas',
    image: 'aros-de-perlas-product.webp',
    details: ['Color blanco', 'Talle mini', 'Clásico'],
    price: 1900,
  },
];

export const madeForYou: SiteProduct[] = [
  {
    id: 'aros-chunky-dorados',
    weightGrams: 25,
    name: 'Aros chunky dorados',
    image: 'aros-chunky-product.webp',
    details: ['Tamaño estándar'],
    price: 2000,
  },
  {
    id: 'stud-con-piedras',
    weightGrams: 8,
    name: 'Stud con piedras',
    image: 'stud-con-piedras-product.webp',
    details: ['Tamaño mini'],
    price: 1600,
  },
  {
    id: 'anillo-de-corazon',
    weightGrams: 8,
    name: 'Anillo de corazón',
    image: '930c240553efa69158624d6e8ffce7ab.webp',
    details: ['Talle 17', 'Color dorado'],
    price: 2700,
  },
];

export const cosmoComplements: SiteProduct[] = [
  {
    id: 'clips-de-ajuste',
    weightGrams: 40,
    name: 'Clips de ajuste',
    image: 'db72809dd5a67c9ba8809f1c27208460.webp',
    details: ['Material de poliéster', 'Colores: rosa, negro y champán'],
    price: 4500,
  },
  {
    id: 'antifaz',
    weightGrams: 40,
    name: 'Antifaz',
    image: 'a5c1db9044ae518d77d36ca48c5b2c2b.webp',
    details: ['Forma de lazos', 'Color blanco'],
    price: 5000,
  },
  {
    id: 'pocket-light',
    weightGrams: 90,
    name: 'Pocket Light',
    image: '4cd09c22945b8e72db10867747ae9982.webp',
    details: ['Mini LED portátil', 'Sensor automático', 'Recargable por USB'],
    price: 8335,
  },
];

export const cosmoEssentials: SiteProduct[] = [
  {
    id: 'pulsera',
    weightGrams: 45,
    name: 'Pulsera',
    image: 'd6bec5a2f33fb8a85d00bdb7669c5893.webp',
    details: ['Cuero sintético'],
    price: 4000,
  },
  {
    id: 'llaveros',
    weightGrams: 60,
    name: 'Llaveros',
    image: '223f910ff517df1c95455d062034f213.webp',
    details: [
      'Adiciones vintage para hombres',
      'Diseño de un arma de una pieza con funda',
      'Colores: violeta, blanco y negro',
    ],
    price: 6300,
  },
  {
    id: 'cigarette-holder',
    weightGrams: 30,
    name: 'Cigarette Holder',
    image: 'c787e9aa07073fd7e62d532e799b7f41.webp',
    details: ['Anillo de dedo para fumar', 'Forma de dragón'],
    price: 9000,
  },
];

export const adjusterPack: SiteProduct = {
  id: 'pack-2-clips-de-ajuste',
  weightGrams: 80,
  name: 'Pack de 2 clips de ajuste',
  image: 'db72809dd5a67c9ba8809f1c27208460.webp',
  details: ['Material de poliéster', 'Colores: rosa, negro y champán'],
  price: 3000,
};

/** Precio por separado de los 2 clips (2 × $2.500), para mostrar el ahorro del pack. */
export const adjusterPackRegularPrice = 5000;

/** Cross-selling: set de descanso que se suma a cualquier compra. */
export const restSet: SiteProduct = {
  id: 'set-de-descanso',
  name: 'Set de descanso',
  image: 'a5c1db9044ae518d77d36ca48c5b2c2b.webp',
  weightGrams: 120,
  details: ['Antifaz de seda', 'Scrunchie anti-frizz a tono', 'Bolsita de tela protectora'],
  price: 3000,
  requiresPurchase: true,
};

export const frequentlyAsked = [
  {
    question: '¿Cuánto tarda en llegar mi pedido?',
    answer: 'Entre 3 y 7 días hábiles. Te enviamos el número de seguimiento por mail.',
    icon: 'faq-02.svg',
  },
  {
    question: '¿Cuánto cuesta el envío?',
    answer: `Depende del destino y del peso del paquete: lo calculás en el carrito con tu provincia o país. En Argentina es gratis en compras desde ${formatCurrency(shippingSettings.freeShippingFrom)}.`,
    icon: 'faq-03.svg',
  },
  {
    question: '¿Puedo cambiar mi producto?',
    answer:
      'Sí. Tenés 30 días desde que lo recibís. El producto debe estar sin uso y en su caja original.',
    icon: 'faq-04.svg',
  },
  {
    question: '¿Quién paga el envío de la devolución?',
    answer: 'Nosotros. Te mandamos la etiqueta o coordinamos el retiro sin costo.',
    icon: 'faq-05.svg',
  },
  {
    question: '¿En cuánto tiempo me devuelven el dinero?',
    answer: 'En 5 días hábiles, por el mismo medio de pago.',
    icon: 'faq-06.svg',
  },
  {
    question: '¿Los aros son hipoalergénicos?',
    answer:
      'Sí, nuestros productos están pensados para pieles sensibles. Si tenés dudas sobre un producto puntual, escribinos.',
    icon: 'faq-07.svg',
  },
];

export const reviews = [
  {
    name: 'Mishie Elvina',
    image: '0b5abe047713b6ee7721bb8bf7377818.webp',
    quote:
      'Los detalles son incluso más lindos en persona. Todo llegó súper delicado y el packaging es hermoso ✧',
  },
  {
    name: 'Nicholas Bentley',
    image: '77bf3182a62f64ad9ffa15f0e077fc48.webp',
    quote:
      'No suelo comprar este tipo de accesorios, pero encontré cosas muy útiles y con un diseño re lindo. La Pocket Light y los clips terminaron siendo más prácticos de lo que esperaba.',
  },
  {
    name: 'Alyanna Silvestre',
    image: '45920a3d0f3dd86c2a2c7c57014cd014.webp',
    quote:
      'Compré varias piezas y sinceramente superaron mis expectativas. La calidad es hermosa y los accesorios tienen ese toque minimalista y femenino que estaba buscando. Siempre recibo cumplidos cuando los uso.',
  },
];

export const brandPromises = [
  {
    title: 'Envíos y devoluciones internacionales gratis',
    icon: 'values-01.svg',
  },
  { title: 'Atención personalizada', icon: 'values-02.svg' },
  { title: 'Packaging delicado', icon: 'values-03.svg' },
  { title: 'Compras simples y seguras', icon: 'values-04.svg' },
];
