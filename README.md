# Dynamic Viewer Url

Visor dinámico de contenido mediante una URL recibida como parámetro.

Permite abrir contenido externo directamente desde una URL dinámica, por ejemplo:

```text
https://dynamicurl.vercel.app/?url={{1}}
```

Donde `{{1}}` puede contener una URL completa:

```text
https://img.magnific.com/vector-gratis/gente-haciendo-ilustracion-lista-tareas_53876-66076.jpg
```

El sistema detecta automáticamente el tipo de contenido y muestra el recurso de forma responsive, optimizada para teléfonos, tablets, laptops, PCs y pantallas grandes.

---

## 🚀 Tecnologías

- Next.js 16.3
- React
- TypeScript
- Tailwind CSS
- App Router
- Turbopack
- Vercel

---

## ✨ Características

- 🔗 URLs dinámicas mediante parámetros.
- 📄 Visualización de archivos PDF.
- 🖼️ Visualización de imágenes.
- 🎥 Reproducción de vídeos.
- 🎵 Reproducción de audio.
- 🌐 Visualización de contenido web compatible.
- 📦 Detección automática del tipo de recurso.
- 📱 Diseño responsive.
- ⚡ Carga rápida.
- 🔐 Validación de URLs.
- 🛡️ Protección básica contra destinos internos y privados.
- 🚀 Compatible con Vercel.
- 💬 Preparado para utilizarse con botones de WhatsApp Cloud API.
- ☁️ Compatible con URLs de Cloudinary y otros servicios externos.
- 🧩 Arquitectura preparada para futuras extensiones.

---

# 📁 Estructura del proyecto

```text
dynamic-url-viewer/
│
├── app/
│   ├── api/
│   │   └── resolve/
│   │       └── route.ts
│   │
│   ├── components/
│   │   └── dynamic-viewer.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── lib/
│   ├── security.ts
│   └── url.ts
│
├── public/
│
├── .gitignore
├── next.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

---

# ⚙️ Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/condoriluis/dynamic-url-viewer.git
```

## 2. Entrar al proyecto

```bash
cd dynamic-url-viewer
```

## 3. Instalar dependencias

```bash
npm install
```

## 4. Ejecutar en desarrollo

```bash
npm run dev
```

Abrir:

```text
http://localhost:3000
```

---

# 🔗 Uso

La aplicación recibe una URL mediante el parámetro:

```text
url
```

Ejemplo:

```text
http://localhost:3000/?url=https://example.com/archivo.pdf
```

En producción:

```text
https://dynamicurl.vercel.app/?url=https://example.com/archivo.pdf
```

Cuando la URL contiene caracteres especiales, debe utilizarse correctamente codificada.

---

# 📄 PDF

Si la URL apunta a un PDF:

```text
https://dynamicurl.vercel.app/?url=https://example.com/documento.pdf
```

El sistema detecta automáticamente:

```text
type: pdf
```

y muestra el documento directamente en pantalla.

El visor está diseñado para ocupar todo el viewport sin elementos visuales innecesarios.

---

# 🖼️ Imágenes

Soporta diferentes formatos de imagen, dependiendo de la disponibilidad y configuración del servidor remoto:

```text
.jpg
.jpeg
.png
.gif
.webp
.avif
.svg
```

Ejemplo:

```text
https://dynamicurl.vercel.app/?url=https://example.com/imagen.webp
```

---

# 🎥 Vídeos

Soporta formatos reproducibles por el navegador:

```text
.mp4
.webm
.mov
.m4v
```

Ejemplo:

```text
https://dynamicurl.vercel.app/?url=https://example.com/video.mp4
```

El reproductor utiliza los controles nativos del navegador.

---

# 🎵 Audio

Soporta formatos como:

```text
.mp3
.wav
.ogg
.m4a
.aac
```

Ejemplo:

```text
https://dynamicurl.vercel.app/?url=https://example.com/audio.mp3
```

---

# 📑 Documentos

Para documentos que el navegador no puede visualizar directamente, el sistema proporciona una opción para abrir el archivo externamente.

Ejemplos:

```text
.doc
.docx
.xls
.xlsx
.ppt
.pptx
.txt
.csv
```

---

# 🌐 Contenido web

Cuando el recurso es una página HTML y el servidor remoto permite su inclusión mediante `iframe`, el sistema puede mostrarla directamente.

Ejemplo:

```text
https://dynamicurl.vercel.app/?url=https://example.com
```

El comportamiento depende de las políticas del sitio remoto.

---

# 📱 Responsive

El visor está diseñado para adaptarse automáticamente a diferentes tamaños de pantalla:

- 📱 Smartphones
- 📱 Tablets
- 💻 Laptops
- 🖥️ PCs
- 🖥️ Monitores medianos
- 🖥️ Monitores grandes

El contenido utiliza el espacio disponible del viewport y evita elementos visuales innecesarios.

---

# 💬 Integración con WhatsApp

El proyecto está pensado para integrarse con un chatbot utilizando WhatsApp Cloud API.

Por ejemplo, una variable del chatbot puede contener:

```text
{{1}}
```

cuyo valor sea:

```text
https://img.magnific.com/vector-gratis/gente-haciendo-ilustracion-lista-tareas_53876-66076.jpg
```

La plantilla de WhatsApp puede utilizar:

```text
https://dynamicurl.vercel.app/?url={{1}}
```

El usuario verá un botón como:

```text
Ver mi pedido
```

Al pulsarlo:

```text
WhatsApp
    ↓
Dynamic Viewer
    ↓
Obtiene {{1}}
    ↓
Valida la URL
    ↓
Detecta el contenido
    ↓
Muestra el recurso
```

# 📡 API

El proyecto incluye un endpoint para resolver y analizar URLs:

```text
GET /api/resolve
```

Parámetro:

```text
url
```

Ejemplo:

```text
/api/resolve?url=https://example.com/documento.pdf
```

Respuesta:

```json
{
  "success": true,
  "url": "https://example.com/documento.pdf",
  "type": "pdf",
  "contentType": "application/pdf"
}
```

---

# 🧠 Detección de contenido

El sistema intenta identificar el tipo de recurso mediante:

1. `Content-Type` proporcionado por el servidor.
2. Extensión del archivo.
3. Estructura de la URL.
4. Fallback para recursos desconocidos.

Tipos internos utilizados:

```text
pdf
image
video
audio
document
web
unknown
```

---

# 🔐 Seguridad

Las URLs recibidas son validadas antes de ser procesadas.

Se permiten únicamente:

```text
http://
https://
```

Se bloquean destinos internos conocidos como:

```text
localhost
127.0.0.1
0.0.0.0
::1
```

También se bloquean rangos privados IPv4 conocidos:

```text
10.x.x.x
192.168.x.x
172.16.x.x - 172.31.x.x
169.254.x.x
```

Además, se rechazan hosts internos como:

```text
.local
.internal
```

# 🔧 Variables de entorno

Actualmente la aplicación no necesita variables de entorno.

No se requieren:

```text
API_KEY
TOKEN
DATABASE_URL
SECRET
```

para la funcionalidad básica.

En futuras versiones pueden incorporarse variables para:

```text
NEXT_PUBLIC_APP_URL
ALLOWED_DOMAINS
API_SECRET
RATE_LIMIT
```

Los secretos nunca deben almacenarse directamente en el código fuente.

---

# 🧪 Desarrollo

Ejecutar:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:3000
```

---

# 🏗️ Build

Para verificar que el proyecto puede compilarse:

```bash
npm run build
```

Si el build termina correctamente:

```bash
npm run start
```

---

# 🚀 Despliegue en Vercel

El proyecto está preparado para desplegarse en Vercel.

## Pasos

1. Crear un repositorio en GitHub.
2. Subir el proyecto.
3. Entrar en Vercel.
4. Importar el repositorio.
5. Vercel detectará Next.js.
6. Ejecutar `Deploy`.

No es necesario utilizar:

```text
Docker
```

ni una base de datos para la versión actual.

---

# 📦 Git

Inicializar:

```bash
git init
```

Agregar archivos:

```bash
git add .
```

Crear commit:

```bash
git commit -m "feat: create dynamic viewer"
```

Conectar repositorio:

```bash
git remote add origin https://github.com/condoriluis/dynamic-url-viewer.git
```

Cambiar rama:

```bash
git branch -M main
```

Subir:

```bash
git push -u origin main
```

---

# 🔄 Flujo completo

```text
┌───────────────────────┐
│ WhatsApp / BotFlow    │
└───────────┬───────────┘
            │
            │ {{1}}
            ▼
┌───────────────────────┐
│ Dynamic Viewer        │
│ ?url={{1}}            │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Validación de URL     │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Detección de tipo     │
└───────────┬───────────┘
            │
       ┌────┴────┐
       ▼         ▼
     PDF       Imagen
       │         │
       ▼         ▼
     Video     Audio
       │         │
       └────┬────┘
            ▼
┌───────────────────────┐
│ Visualización         │
│ Responsive            │
└───────────────────────┘
```

---

# 📌 Ejemplo completo

## URL original

```text
https://img.magnific.com/vector-gratis/gente-haciendo-ilustracion-lista-tareas_53876-66076.jpg
```

## URL del visor

```text
https://dynamicurl.vercel.app/?url=https://img.magnific.com/vector-gratis/gente-haciendo-ilustracion-lista-tareas_53876-66076.jpg
```

## Resultado

El usuario abre el enlace y el sistema:

```text
1. Recibe la URL
2. Valida el destino
3. Detecta que es PDF
4. Carga el recurso
5. Lo muestra en pantalla completa
```
