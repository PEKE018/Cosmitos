# Mejoras de esta versión

## Funcionalidad
- **Pedidos por WhatsApp**: el resumen del carrito antes no iba a ningún lado. Ahora abre WhatsApp con el pedido completo y permite copiarlo.
- **Envío gratis desde $50.000**: la página de envíos lo prometía pero el carrito siempre cobraba $2.000. Ahora se aplica y se muestra cuánto falta.
- **Contador del carrito visible en celular** (estaba dentro del menú cerrado) y confirmación "Agregado ✓" al sumar.
- **Vaciar carrito** pide confirmación.
- Más vendidos: botón "Consultar por WhatsApp" (antes eran tarjetas sin acción).
- Combos: se eliminaron los falsos botones ("Llevar pack", "ficha de producto") y el falso "Iniciar envío"; ahora hay acciones reales.
- Contacto: email y teléfono ahora son links (`mailto:` y WhatsApp).
- "Saltar al contenido", Escape cierra el menú móvil y la página vuelve arriba al cambiar de ruta.
- Ruta `/envos-y-devoluciones` corregida a `/envios-y-devoluciones` (la vieja redirige). `/precios` redirige a `/hechos-para-ti`.
- Favicon, descripción y datos para compartir en redes.

## Fotos
- **Fotos de productos cruzadas** en Más vendidos (Ajustador, Aros colgantes y Anillo espiral tenían la imagen de otro producto): corregidas.
- "Aros de perlas" era una captura de pantalla de Instagram: se recortó solo la foto.
- Se recortaron los puntitos de carrusel de Instagram en 3 fotos.
- Todas las imágenes pasaron a WebP: de ~9 MB a ~1 MB en las fotos usadas.

## Diseño
- Una sola paleta, escala tipográfica y estilo de botones. Pasó de ~10 familias de letra a 3 (display, serif, sans): las fuentes bajaron de 5,8 MB a 0,4 MB.
- "Hechos para ti" estaba en una columna angosta también en escritorio: ahora es una grilla de 3 columnas (2 en tableta/celular).
- Tarjetas de producto unificadas; precios con formato único ($ 2.000; antes `$2,000`, `$6300` y `9,000`).
- Inicio con llamadas a la acción y accesos a las tres secciones; el logo (letras blancas) ahora va sobre fondo oscuro para que se lea.
- Menú principal simplificado; Envíos, Preguntas frecuentes y Lo que nos define pasaron al pie de página.
- Ortografía y voseo unificados (Cuánto, Quién, envío, ¿Querés…, Contactanos).
- Foco visible, `font-display: swap` y respeto por "reducir movimiento".

## Para decidir (no se tocó)
- "Envíos y devoluciones **internacionales** gratis" (Lo que nos define) contradice el resto: el carrito solo envía a Argentina.
- Las opiniones (Mishie Elvina, Nicholas Bentley, Alyanna Silvestre) parecen de la plantilla de Canva. Si no son clientes reales, conviene reemplazarlas.
- `hello@cosmo.com` parece un email de ejemplo: confirmar el real.
- Precios: "Clips de ajuste" cuesta $4.500 solo, pero el pack de 2 cuesta $3.000.
- Hay fotos de baja resolución (aros chunky y stud con piedras, ~300 px): se ven blandas en pantallas grandes.
- Hay 8 PNG en `public/assets/photos/` que ninguna página usa.
