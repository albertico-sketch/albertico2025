# 🐾 VetSync - Plataforma Veterinaria Digital

Una plataforma web moderna que conecta a dueños de mascotas con servicios veterinarios de calidad, facilitando la gestión de citas, historial médico y servicios en un solo lugar.

![VetSync](./src/assets/vetsync_logo.webp)

## ✨ Características Principales

### 🔐 Sistema de Autenticación

- Registro e inicio de sesión seguro
- Autenticación JWT con refresh tokens automáticos
- Protección de rutas y datos personales

### 🏥 Servicios Veterinarios

- Catálogo completo de servicios (Veterinaria y Estética)
- Información detallada de cada servicio
- Categorización por especialidades

### 🐕 Gestión de Mascotas

- Registro completo de mascotas con información detallada
- Subida de imágenes para cada mascota
- Categorización por especie, raza, edad y sexo
- Edición y eliminación de registros

### 📅 Sistema de Citas

- Agendamiento inteligente de citas veterinarias
- Selección de servicios especializados
- Gestión de horarios disponibles
- Historial completo de citas

### 📱 Diseño Responsivo

- Interfaz adaptada para móviles, tablets y desktop
- Componentes optimizados con Sheet/Dialog según el dispositivo
- Experiencia de usuario consistente en todas las pantallas

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React 19** - Biblioteca principal
- **Vite** - Herramienta de construcción y desarrollo
- **React Router DOM** - Navegación entre páginas
- **Tailwind CSS** - Framework de estilos
- **shadcn/ui** - Componentes accesibles
- **Lucide React** - Iconografía
- **dicebear** - Generador de avatares programático (avatars para mascotas/usuarios)
- **tanstack-react-table** - Tablas y data-grid
- **unpic-react** - Optimización y carga de imágenes
- **react-day-picker** - Selector de fechas
- **ESLint** - Linter y reglas del proyecto

### Gestión de Estado

- **React Context API** - Estado global de la aplicación
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas

### HTTP y Datos

- **Axios** - Cliente HTTP
- **js-cookie** - Gestión de cookies
- **date-fns** - Manipulación de fechas

### UI/UX

- **Sonner** - Notificaciones toast
- **Vaul** - Drawer components para móviles
- **Next Themes** - Soporte para tema claro/oscuro

## 📁 Estructura del Proyecto

```txt
src/
├── app/                   # Configuración principal de la aplicación
├── components/            # Componentes reutilizables
│   ├── ui/                # Componentes base de UI
│   ├── appointments/      # Componentes de citas
│   ├── pets/              # Componentes de mascotas
│   ├── header/            # Navegación y header
│   ├── home/              # Componentes de la página principal
│   └── loaders/           # Componentes de carga
├── contexts/              # Contextos de React (estado global)
├── hooks/                 # Custom hooks
├── lib/                   # Utilidades y configuraciones
├── schemas/               # Esquemas de validación Zod
├── services/              # Servicios de API
├── styles/                # Estilos globales
└── views/                 # Páginas principales
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- pnpm (recomendado) o npm

### Instalación

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/omancillav/vet-sync-app.git
   cd vet-sync-app
   ```

2. **Instala las dependencias**

   ```bash
   pnpm install
   # o
   npm install
   ```

3. **Configura las variables de entorno**

   Crea un archivo `.env` en la raíz del proyecto:

   ```env
   VITE_API_BASE_URL=tu_url_del_backend
   VITE_API_KEY=tu_api_key
   ```

4. **Inicia el servidor de desarrollo**

   ```bash
   pnpm dev
   # o
   npm run dev
   ```

5. **Abre tu navegador**

   Ve a [http://localhost:5173](http://localhost:5173)

## 📊 Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Inicia el servidor de desarrollo

# Construcción
pnpm build           # Construye la aplicación para producción

# Linting
pnpm lint            # Ejecuta ESLint
pnpm lint:fix        # Corrige automáticamente los problemas de ESLint

# Vista previa
pnpm preview         # Vista previa de la construcción de producción
```

## 🎨 Características de UI/UX

- **Tema Claro/Oscuro**: Soporte completo para ambos temas
- **Componentes Accesibles**: Construidos con shadcn/ui
- **Animaciones Fluidas**: Transiciones suaves y feedback visual
- **Formularios Inteligentes**: Validación en tiempo real
- **Notificaciones**: Sistema de toast para feedback del usuario
- **Carga Optimizada**: Skeletons y estados de carga elegantes

## 🔒 Seguridad

- Autenticación JWT con refresh tokens
- Cookies seguras con flags `secure` y `sameSite`
- Validación de datos con Zod
- Interceptores de Axios para manejo automático de tokens
- Rutas protegidas por autenticación

## 📱 Responsive Design

La aplicación está optimizada para diferentes dispositivos:

- **Mobile First**: Diseño pensado primero para móviles
- **Breakpoints Adaptativos**: sm, md, lg, xl
- **Componentes Dinámicos**: Sheet en móvil, Dialog en desktop
- **Touch Friendly**: Controles optimizados para touch

## ☁️ Despliegue (Vercel)

El proyecto está preparado para desplegarse en **Vercel**. Se incluye un archivo `vercel.json` que redirige todo el tráfico a `index.html`, útil para aplicaciones SPA con routing del cliente:

```json
{
  "rewrites": [
    { "source": "\\/(.*)", "destination": "/index.html" }
  ]
}
```

Puntos clave y pasos para desplegar:

- Configuración de build en Vercel:
  - Framework: Selecciona "Other" o "Vite" si aparece.
  - Build Command: `pnpm build` (o `npm run build`)
  - Output Directory: `dist`

- Variables de entorno recomendadas (ajusta según tu backend):
  - `VITE_API_BASE_URL` - URL base del backend
  - `VITE_API_KEY` - API key (si aplica)
  - `NODE_ENV` - `production`s

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 👨‍💻 Autor

### omancilla

- GitHub: [@omancillav](https://github.com/omancillav)

---

⭐ ¡No olvides darle una estrella al proyecto si te gustó!
