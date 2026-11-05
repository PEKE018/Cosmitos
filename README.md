# Cosmo Accesorios

Reconstrucción estática del sitio de Canva con React, TypeScript y Vite. El proyecto no incluye backend ni una función de compra.

El carrito de navegador y el formulario de entrega permiten preparar un resumen, con una tarifa fija de envío de $2.000 ARS por CP válido (origen: Laborde, Córdoba, CP 2657). No se envían pedidos ni se procesan pagos. Para cambiar las tarifas, conectar un correo o habilitar pedidos, consulta [CARRITO-Y-ENVIOS.md](./CARRITO-Y-ENVIOS.md).

## Desarrollo local

```sh
npm install
npm run dev
```

## Verificación de producción

```sh
npm run build
npm run preview
```

Los recursos recuperados están en `public/assets/`. La navegación usa rutas con hash para funcionar en hosting estático, incluido GitHub Pages sin reglas de reescritura.

Para publicar en GitHub Pages, configura el repositorio para desplegar el contenido de `dist/` después de ejecutar `npm run build`. No se publica automáticamente desde este proyecto.
