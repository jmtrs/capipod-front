# Podcasts Frontend

Podcasts es un prototipo de aplicación para Podcasts. Este proyecto se centra en la implementación del frontend, proporcionando una interfaz de usuario para interactuar con datos de Podcasts a través de APIs externas.

## IMPORTANTE

Para que el cors funcione acceder a https://cors-anywhere.herokuapp.com/corsdemo y pulsar en Request temporary access to the demo server, despues levantar el front. 

Esta opción tiene un rendimiento mejor que el Allorigins que se propone en la prueba.

Solo he mapeado una de las entidades (los podcasts) ya que para los episodios el orden de los datos con un primer elemento que es distinto del resto no me parece una buena aproximación, lo suyo sería tener una llamada aparte para los datos de los episodios o una propiedad añadida en la misma llamada. Se entiende que sé hacerlo con el mapeo de los podcasts.

El store está todo junto por descisión propia, se puede separar, pero para una prueba como esta considero que es más que suficiente.

Me he tomado algunas libertades a nivel de diseño que creo que mejoran la experiencia de usuario y muestran más sobre lo que puedo llegar a hacer, pero a su vez conservan la esencia inicial. 

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
git clone https://github.com/jmtrs/podcasts-front.git
cd podcasts-front
```

2. Instala las dependencias:

```bash 
npm install
```

3. Ejecuta la aplicación en modo de desarrollo:

```bash
npm run dev
```

4. Abre [http://127.0.0.1:5173](http://127.0.0.1:5173) en tu navegador para ver la aplicación.
5. ¡Listo! Ahora puedes empezar a interactuar con la aplicación.

## Pruebas

Para ejecutar las pruebas unitarias y de integración, puedes utilizar el siguiente comando:

```bash
npm run test
```

## Docker

Si prefieres ejecutar la aplicación en un contenedor Docker, puedes utilizar el siguiente comando:

```bash
docker build -t podcasts-front .
docker run -p 3000:3000 podcasts-front
```

## Licencia

Este proyecto está licenciado bajo la Licencia Apache 2.0. Consulta el archivo [LICENSE](LICENSE) para más detalles.
