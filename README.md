# Oscar Contreras — Impulso Laboral

Landing page desarrollada con React y Vite. Incluye una función serverless de
Vercel para enviar avances del formulario a un webhook de n8n.

## Desarrollo local

```bash
npm install
npm run dev
```

## Verificación

```bash
npm run lint
npm run build
```

El build de producción se genera en `build/`.

## Configuración en Vercel

- Framework Preset: `Vite`
- Root Directory: `./` (raíz del repositorio)
- Build Command: `npm run build`
- Output Directory: `build`
- Install Command: `npm install` (o dejar el valor automático)
- Development Command: `vite` (o dejar el valor automático)

Agregar estas variables en **Project Settings > Environment Variables** para
Production, Preview y Development:

- `N8N_PARTIAL_LEAD_WEBHOOK_URL`
- `PARTIAL_LEAD_WEBHOOK_SECRET`

Usar los valores reales únicamente en Vercel o en un archivo `.env.local`; no
subir secretos al repositorio.
