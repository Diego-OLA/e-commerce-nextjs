# E-commerce

Aplicación de comercio electrónico desarrollada con Next.js y TypeScript.

## Configuración

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Crea `.env.local` en la raíz del proyecto y configura la URL de la API. Usa el nombre de variable que lee `app/lib/api-client.ts`.

   ```env
   # Ejemplo: reemplaza el nombre por el que espera api-client.ts
   API_BASE_URL=http://localhost:8000
   ```

3. Asegúrate de que la API esté ejecutándose y accesible desde la aplicación.

## Ejecutar el proyecto

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Otros comandos habituales, si están definidos en `package.json`:

```bash
npm run build
npm start
npm run lint
```

## Rutas y funcionalidades

| Ruta | Funcionalidad |
|---|---|
| `/catalogo` | Consulta y muestra el catálogo de productos. |
| `/catalogo/products/[id]` | Muestra el detalle de un producto. |
| `/login` | Formulario de inicio de sesión. |
| `/orders/[id]` | Destino al que se redirige al crear una orden. |
| `/orders/[id]/success` | Muestra el resumen de una orden pagada. |
| `/orders/historial` | Muestra el historial de ordenes con su estado. |

### Checkout

La creación de la orden se realiza mediante `createOrderAction`, que envía los productos y sus cantidades a la API. Después, redirige a `/orders/[id]`. El pago se procesa mediante `processPaymentAction`.

