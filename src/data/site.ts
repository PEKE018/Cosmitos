export type SiteProduct = {
  name: string;
  image: string;
  details: string[];
  price?: string;
};

export const navigation = [
  { label: 'Inicio', to: '/' },
  { label: 'entrada', to: '/entrada' },
  { label: 'Mas vendidos', to: '/mas-vendidos' },
  { label: 'Hechos para ti', to: '/precios' },
  { label: 'Combos', to: '/combos' },
  { label: 'Envíos y devoluciones', to: '/envos-y-devoluciones' },
  { label: 'Preguntas Frecuentes', to: '/preguntas-frecuentes' },
  { label: 'Lo que nos define', to: '/lo-que-nos-define' },
  { label: 'Clientes', to: '/clientes' },
  { label: 'Contactos', to: '/contactos' },
];

export const bestSellers: SiteProduct[] = [
  {
    name: 'Ajustador de Cintura',
    image: '64befa1837d9fa938166b4506fbcbacf.jpg',
    details: ['Conejo', 'Colores: blanco, negro.', 'Para niños'],
  },
  {
    name: 'Aros colgantes de perla',
    image: 'ce7dba79e1c386428b91c07bbd7303f2.png',
    details: ['Color dorado', 'Talle chico'],
  },
  {
    name: 'Anillo espiral',
    image: 'ddcb710297f2e382f86d45679a309417.jpg',
    details: ['Color dorado', 'Talle 18'],
  },
  {
    name: 'Aros de perlas',
    image: 'e9cb4f31d9ff3011438873c9ff8e3d0e.png',
    details: ['Color blanco', 'Talle mini', 'Clasico'],
  },
];

export const madeForYou: SiteProduct[] = [
  {
    name: 'Aros chunky Dorados',
    image: 'aros-chunky-product.png',
    details: ['Tamaño estándar'],
    price: '$2,000',
  },
  {
    name: 'Stud con Piedras',
    image: 'stud-con-piedras-product.png',
    details: ['Tamaño mini'],
    price: '$1,600',
  },
  {
    name: 'Anillo de corazon',
    image: '930c240553efa69158624d6e8ffce7ab.jpg',
    details: ['Talle 17', 'color dorado'],
    price: '$2,700',
  },
];

export const cosmoComplements: SiteProduct[] = [
  {
    name: 'Clips de ajuste',
    image: 'db72809dd5a67c9ba8809f1c27208460.png',
    details: ['Material de poliéster', 'Color: rosa, negro,champán'],
    price: '$4,500',
  },
  {
    name: 'Antifaz',
    image: 'a5c1db9044ae518d77d36ca48c5b2c2b.png',
    details: ['Forma de lazos', 'Color blanco'],
    price: '$5,000',
  },
  {
    name: 'Pocket Light',
    image: '4cd09c22945b8e72db10867747ae9982.png',
    details: ['Mini led portatil', 'Sensor automatico', 'Recargable USB'],
    price: '$8,335',
  },
];

export const cosmoEssentials: SiteProduct[] = [
  {
    name: 'Pulsera',
    image: 'd6bec5a2f33fb8a85d00bdb7669c5893.png',
    details: ['Cuero sintetico'],
    price: '$4,000',
  },
  {
    name: 'LLaveros',
    image: '223f910ff517df1c95455d062034f213.png',
    details: [
      'Adiciones vintage para hombres',
      'Diseño de un arma de una pieza con funda',
      'Colores: violeta, blanco, negro',
    ],
    price: '$6300',
  },
  {
    name: 'Cigarette Holder',
    image: 'c787e9aa07073fd7e62d532e799b7f41.png',
    details: ['Anillo de dedo para fumar', 'Forma de dragón'],
    price: '9,000',
  },
];

export const adjusterPack: SiteProduct = {
  name: 'Pack de 2 clips de ajuste',
  image: 'db72809dd5a67c9ba8809f1c27208460.png',
  details: ['Material de poliéster', 'Color: rosa, negro,champán'],
  price: '$3,000',
};

export const frequentlyAsked = [
  {
    question: 'Cúanto tarda en llegar mi pedido?',
    answer: 'Entre 3 y 7 días hábiles. Te enviamos el número de seguimiento por mail.',
    icon: 'faq-02.svg',
  },
  {
    question: 'Cúanto cuesta el envío?',
    answer: 'Se calcula al finalizar la compra según tu código postal.',
    icon: 'faq-03.svg',
  },
  {
    question: 'Puedo cambiar mi producto?',
    answer:
      'Sí. Tenés 30 días desde que lo recibís. El producto debe estar sin uso y en su caja original.',
    icon: 'faq-04.svg',
  },
  {
    question: 'Quíen paga el envio de la devolución?',
    answer: 'Nosotros. Te mandamos la etiqueta o coordinamos el retiro sin costo.',
    icon: 'faq-05.svg',
  },
  {
    question: 'En cuánto tiempo me devuelven el dinero?',
    answer: 'En 5 días hábiles, por el mismo medio de pago.',
    icon: 'faq-06.svg',
  },
  {
    question: 'Los aros son hipoalergénicos?',
    answer:
      'Sí, nuestros productos están pensados para pieles sensibles. Si tenés dudas sobre un producto puntual, escribinos.',
    icon: 'faq-07.svg',
  },
];

export const reviews = [
  {
    name: 'Mishie Elvina',
    image: '0b5abe047713b6ee7721bb8bf7377818.jpg',
    quote:
      'Los detalles son incluso más lindos en persona. Todo llegó súper delicado y el packaging es hermoso ✧',
  },
  {
    name: 'Nicholas Bentley',
    image: '77bf3182a62f64ad9ffa15f0e077fc48.jpg',
    quote:
      'No suelo comprar este tipo de accesorios, pero encontré cosas muy útiles y con un diseño re lindo. La pocket light y los clips terminaron siendo más prácticos de lo que esperaba',
  },
  {
    name: 'Alyanna Silvestre',
    image: '45920a3d0f3dd86c2a2c7c57014cd014.jpg',
    quote:
      'Compré varias piezas y sinceramente superaron mis expectativas. La calidad es hermosa y los accesorios tienen ese toque minimalista y femenino que estaba buscando. Siempre recibo cumplidos cuando los uso',
  },
];

export const brandPromises = [
  {
    title: 'Envíos y devoluciones internacionales gratis',
    icon: 'values-01.svg',
  },
  { title: 'Atencion personalizada', icon: 'values-02.svg' },
  { title: 'Packaging delicado', icon: 'values-03.svg' },
  { title: 'Compras simples y seguras', icon: 'values-04.svg' },
];
