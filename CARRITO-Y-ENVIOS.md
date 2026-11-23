# Carrito, envío y pedidos

## Funcionamiento actual

- Los productos con precio tienen el botón **Agregar al carrito** (confirma con "Agregado ✓"). Los que no tienen precio (Más vendidos) muestran **Consultar por WhatsApp**.
- El carrito se guarda en `localStorage` (clave `cosmo-cart-v2`) y el ícono del encabezado muestra la cantidad en todos los tamaños de pantalla.
- Envío: **$2.000 fijos a todo el país** y **gratis desde $50.000** de subtotal. Ambos valores se editan en `src/data/shipping.ts`. El carrito muestra cuánto falta para el envío gratis.
- El formulario pide datos de entrega en Argentina (CP de 4 dígitos o CPA alfanumérico).
- **Pedido:** "Generar resumen del pedido" muestra el resumen y habilita **Enviar pedido por WhatsApp** (abre `wa.me` con el pedido y los datos de entrega escritos) y **Copiar resumen**. El pedido no queda confirmado hasta que Cosmo responda; no se cobra nada en el sitio.

## Datos de contacto y WhatsApp

Todo está en `src/data/contact.ts`: número de WhatsApp (formato internacional sin `+`, por ejemplo `5493537590606`), Instagram, email y horario. Se usan en Contacto, el pie de página, Envíos y el pedido.

## Cambiar la tarifa o el umbral de envío gratis

```ts
// src/data/shipping.ts
export const shippingSettings = {
  originPostalCode: '2657',
  flatRate: 2000,
  freeShippingFrom: 50000,
} as const;
```

Los importes son pesos enteros, sin separadores.

## Agregar o editar un producto

En `src/data/site.ts`, cada producto necesita `id` único y estable (el carrito lo usa), nombre, imagen y, si se vende online, `price` como número:

```ts
{
  id: 'nombre-del-producto',
  name: 'Nombre del producto',
  image: 'archivo.webp',
  details: ['Detalle'],
  price: 12500,
}
```

Sin `price`, la tarjeta muestra "Consultar por WhatsApp". Las fotos van en `public/assets/photos/`; conviene subirlas en WebP, de hasta 900 px de lado.

## Cobrar online o cotizar con el correo

Hoy el cobro se coordina por WhatsApp. Para cobrar en el sitio o usar tarifas reales por CP hace falta un backend o una función serverless (las claves de pasarelas y correos no pueden ir en React ni en variables `VITE_*`) y recalcular precios y envío del lado del servidor antes de confirmar.

## Comprobaciones manuales

1. Agregá productos desde el celular: el contador del encabezado se actualiza sin abrir el menú.
2. Cambiá cantidades y quitá un artículo; recargá y verificá que el carrito se conserva.
3. Probá CP `2657` y `C1000ABC` (válidos) y `26` (inválido, no debe permitir el resumen).
4. Con subtotal desde $50.000 el envío debe figurar como "Gratis".
5. Generá el resumen y verificá que el mensaje de WhatsApp tenga productos, total y dirección.
6. "Vaciar carrito" pide una segunda confirmación.
