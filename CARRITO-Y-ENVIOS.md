# Carrito y cálculo de envío

## Funcionamiento actual

- Los productos con precio publicado tienen un botón **Agregar al carrito**. El pack de clips de ajuste de la página Combos también se puede agregar.
- El carrito conserva productos y cantidades en `localStorage` del navegador. Se pueden aumentar o disminuir unidades, quitar artículos y vaciar el carrito.
- El formulario solicita datos de contacto y entrega en Argentina. Acepta el CP tradicional de cuatro dígitos y el CPA alfanumérico.
- Con un CP válido, calcula el subtotal y suma una tarifa fija de envío de **$2.000 ARS**. El origen configurado es **Laborde, Córdoba (CP 2657)**.
- **No se conecta a un correo, no confirma ni envía pedidos y no cobra.** El botón final genera un resumen visible en la misma página. La tarifa es la regla fija elegida para esta versión, no una cotización oficial de un transportista.
- Los productos de Más vendidos que no tienen un precio publicado todavía no se pueden agregar; no se les asignó un precio supuesto.

## Cambiar el origen o la tarifa fija

Editá `src/data/shipping.ts`:

```ts
export const shippingSettings = {
  originPostalCode: '2657',
  flatRate: 2000,
} as const;
```

`flatRate` se expresa en pesos argentinos como un número entero, sin separadores. Por ejemplo, para fijar el envío en $3.500, cambiá el valor a `3500`. La tarifa se aplica a todos los CP válidos mientras el modelo siga siendo fijo.

## Agregar un producto al carrito

En `src/data/site.ts`, cada producto necesita nombre, imagen y precio:

```ts
{
  name: 'Nombre del producto',
  image: 'archivo-de-imagen.jpg',
  details: ['Detalle'],
  price: '$12,500',
}
```

Las tarjetas muestran el botón de carrito cuando hay un precio válido. El precio se interpreta en pesos enteros; por ejemplo, `$12,500` se convierte a `12500`.

## Configurar tarifas reales por CP o zona

Antes de reemplazar la tarifa fija, reuní el tarifario vigente del correo y confirmá qué cubre: CP/rangos o zonas, servicio elegido, peso y dimensiones del paquete, recargos y condiciones de envío gratis. El origen de despacho configurado es CP 2657.

Luego:

1. Reemplazá el cálculo fijo de `src/data/shipping.ts` por una función tipada que reciba el destino y los datos del paquete y devuelva una cotización o un error explícito.
2. En `src/pages/CartPage.tsx`, solicitá esa cotización al cambiar el CP y presentá su estado (calculando, disponible o error). No muestres el total como definitivo si la cotización falló o venció.
3. Si el correo ofrece una API, no pongas claves privadas en React ni en variables `VITE_*`: esas variables son visibles desde el navegador. La consulta autenticada requiere un backend o una función serverless que proteja las credenciales.
4. Verificá en el servicio de checkout/pedidos que se recalculen precios y envío del lado del servidor antes de cobrar o confirmar. El navegador no es una fuente confiable para esos importes.

## Activar envío de pedidos o pagos

El resumen actual es local y no se transmite. Para aceptar pedidos, conectá el botón a un destino definido (por ejemplo, un backend o servicio de pedidos) y acordá qué datos se envían y cómo se gestionan la privacidad y los errores. Para cobrar, integrá una pasarela mediante su flujo oficial y validá el importe en servidor. No cambies el mensaje de resumen por uno de compra confirmada hasta que el servicio responda que la operación fue exitosa.

## Comprobaciones manuales

1. Agregá un producto y comprobá que aparece en el carrito; recargá y verificá que se conserva.
2. Cambiá la cantidad y quitá un artículo; confirmá que se actualiza el subtotal.
3. Probá un CP de cuatro dígitos (`2657`) y un CPA (`C1000ABC`): el envío debe ser $2.000 y el total, subtotal + envío.
4. Probá un CP incompleto: no debe habilitarse un resumen con cotización válida.
5. Completá los datos y generá el resumen; verificá dirección, líneas de productos y total. El pedido debe permanecer sin enviar ni cobrar.
6. Probá el formulario a ancho móvil y de escritorio.
