# NextSocial Frontend

NextSocial es un prototipo de red social. Este proyecto se centra en la implementación del frontend, proporcionando una interfaz de usuario para interactuar con datos de usuarios, álbumes, fotos y tareas (TODOs) a través de APIs externas.

## Tecnologías Utilizadas

- **React**: Utilizado para construir la interfaz de usuario con componentes reutilizables.
- **Vite**: Como herramienta de construcción y servidor de desarrollo para un rápido recargado.
- **Chakra UI**: Biblioteca de componentes de UI para un diseño atractivo y responsivo.
- **Axios**: Cliente HTTP para realizar solicitudes a APIs externas.
- **Zustand**: Biblioteca de gestión de estado para manejar el estado global de la aplicación.
- **React Router**: Para el manejo de rutas en la aplicación de una sola página (SPA).
- **Jest y Testing Library**: Para pruebas unitarias y de integración.
- **ESLint y Prettier**: Para asegurar la calidad del código y mantener un estilo consistente.
- **GitHub Actions**: Para integración y despliegue continuos (CI/CD).
- **Docker**: Para el despliegue de la aplicación en contenedores.

## Características

- Diseño responsivo y modo oscuro.

## Instalación y Uso

### Requisitos Previos

Asegúrate de tener instalado Node.js (recomendamos la versión 14.x o superior) y npm en tu sistema para poder ejecutar el proyecto.

### Pasos para la Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/jmtrs/next-social-front.git
cd next-social-front
```

2. Instala las dependencias:

```bash 
npm install
```

3. Ejecuta la aplicación en modo de desarrollo:

```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.
5. ¡Listo! Ahora puedes empezar a interactuar con la aplicación.

## Pruebas

Para ejecutar las pruebas unitarias y de integración, puedes utilizar el siguiente comando:

```bash
npm run test
```

## Docker

Si prefieres ejecutar la aplicación en un contenedor Docker, puedes utilizar el siguiente comando:

```bash
docker build -t next-social-front .
docker run -p 3000:3000 next-social-front
```

## Licencia

Este proyecto está licenciado bajo la Licencia Apache 2.0. Consulta el archivo [LICENSE](LICENSE) para más detalles.
