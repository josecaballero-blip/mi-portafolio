# Portafolio — Jose Francisco Caballero Gonzalez

Portafolio web profesional con tema oscuro, construido con **React + Vite + Tailwind CSS + Framer Motion**.

## Stack tecnológico
- React 18 + Vite 5
- Tailwind CSS (design tokens personalizados)
- Framer Motion (animaciones de entrada)
- OGL (Aurora WebGL background)
- anime.js (scroll animations)
- Nodemailer (formulario de contacto vía API serverless)

---

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

## Variables de entorno

Crea un archivo `.env` en la raíz (para desarrollo local) o configúralas en Vercel:

```
EMAIL_USER=tu-correo@gmail.com
EMAIL_PASS=tu-app-password-de-google
```

## Deploy en Vercel

El proyecto está configurado para Vercel:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Serverless Functions**: `api/contact.js` (formulario de contacto)

Configura `EMAIL_USER` y `EMAIL_PASS` en **Settings → Environment Variables** de tu proyecto en Vercel.

---

## Estructura del proyecto
```
├── api/
│   └── contact.js         # Serverless function (Vercel)
├── public/
│   ├── certificados/      # PDFs de certificaciones
│   ├── foto-mia.webp      # Foto de perfil
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Navegación con glassmorphism
│   │   ├── Hero.jsx           # Hero con typewriter + foto
│   │   ├── Stats.jsx          # Métricas animadas (rAF)
│   │   ├── Skills.jsx         # +25 habilidades con filtros
│   │   ├── Projects.jsx       # Proyectos con modal
│   │   ├── Automation.jsx     # Servicios de automatización
│   │   ├── Certifications.jsx # Certificaciones AWS + SENA
│   │   ├── AboutMe.jsx        # Sobre mí
│   │   ├── Contact.jsx        # Formulario de contacto
│   │   ├── Footer.jsx         # Footer
│   │   ├── Aurora.jsx         # WebGL aurora background
│   │   ├── AnimatedTitle.jsx  # Títulos animados al scroll
│   │   ├── ScrollProgress.jsx # Barra de progreso
│   │   └── WhatsAppButton.jsx # Botón flotante WhatsApp
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── vercel.json            # SPA routing + rewrites
└── package.json
```
