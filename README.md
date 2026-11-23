# Cosmo Accesorios

Reconstrucción del sitio de Canva con React, TypeScript y Vite. No tiene backend: el carrito vive en el navegador y el pedido se envía por WhatsApp.

El carrito calcula el subtotal y el envío (tarifa fija de $2.000 ARS a todo el país, gratis desde $50.000; origen: Laborde, Córdoba, CP 2657). Al generar el resumen se abre WhatsApp con el pedido ya escrito. No se procesan pagos. Para cambiar tarifas, productos o el número de WhatsApp, consultá [CARRITO-Y-ENVIOS.md](./CARRITO-Y-ENVIOS.md). Los cambios de esta versión están en [MEJORAS.md](./MEJORAS.md).

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

Los recursos recuperados están en `public/assets/`. La navegación usa rutas con hash y rutas relativas para funcionar en hosting estático, incluido GitHub Pages sin reglas de reescritura.

## Publicación en GitHub Pages

El workflow de `.github/workflows/deploy.yml` compila el sitio y publica `dist/` automáticamente cuando subís cambios a `main`.

1. En GitHub, abrí **Settings → Pages** del repositorio y en **Build and deployment → Source** elegí **GitHub Actions**.
2. Desde la terminal de VS Code, subí el workflow y cualquier cambio pendiente:

   ```sh
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

3. En GitHub, abrí la pestaña **Actions** y esperá a que termine el workflow **Deploy to GitHub Pages**.
4. Encontrá la URL publicada en el job completado o en **Settings → Pages**. En un repositorio de proyecto normalmente será `https://USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/`.

Si tu rama principal tiene otro nombre, actualizá la rama `main` indicada en `.github/workflows/deploy.yml`.
