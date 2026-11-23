export const contact = {
  instagramHandle: 'cosmo.street',
  instagramUrl: 'https://www.instagram.com/cosmo.street/',
  email: 'hello@cosmo.com',
  /** Formato internacional sin "+" ni espacios, como lo pide wa.me */
  whatsappNumber: '5493537590606',
  phoneLabel: '+54 9 3537 590606',
  hours: 'Lunes a viernes, de 9 a 18 h',
} as const;

export function whatsappUrl(message: string): string {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
