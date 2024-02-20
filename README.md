# Gestor de Tareas Asistido por IA

![image](https://github.com/jorgeandrespadilla/ai-task-manager/assets/58148764/ac79d067-b3b5-4635-9a62-8eb4b9fffefd)

## Descripción

Este es una aplicación de gestión de tareas asistada por IA, construida con Angular 17. La aplicación debe permitir al usuario agregar, editar, eliminar y marcar como completas/incompletas las tareas. Además, las tareas deben poder clasificarse en categorías.

La aplicación ofrecerá al usuario la posibilidad de usar su asistente de IA para generar tareas en base a la descripción de lo que desea realizar. Además, permitirá obtener sugerencias sobre una tarea en particular para ayudar al usuario a completarla. Para hacer uso de las características de IA de la aplicación, el usuario deberá proporcionar un API Key de OpenAI.

**Requisitos:**

1.	**Página Principal:**
- Mostrar una lista de tareas pendientes y completadas. 
- Cada tarea debe mostrar su nombre y categoría.
- Permitir marcar una tarea como completa/incompleta directamente desde la lista.

2.	**Agregar Tareas:**
- Crear un formulario para agregar nuevas tareas.
- Campos del formulario: Nombre, Descripción, Categoría.
- Validación básica de campos (todos son obligatorios).

3.	**Editar Tareas:**
- Permitir la edición de tareas existentes.
- Incluir una opción para editar desde la lista y otra desde la vista detallada de la tarea.

4.	**Eliminar Tareas:**
-	Permitir eliminar tareas desde la lista de tareas.

5.	**Categorías:**
-	Implementar la posibilidad de agregar/editar/eliminar categorías.
-	Asignar categorías a las tareas.

6.	**Persistencia de Datos:**
-	Implementar almacenamiento de datos para conservar las tareas.

7.	**Filtrado y Ordenamiento:**
-	Agregar opciones para filtrar y ordenar las tareas (por nombre, por categoría, completadas).

8.	**Asistencia por IA:**
- La página de asistencia por IA permitirá crear nuevas tareas en base a una descripción proporcionada por el usuario sobre lo que desea realizar.
-	Las tareas creadas con IA podrán ser conservadas o descartadas por el usuario.
-	Agregar diálogo de configuración para activar las características de IA. Este apartado permitirá activar/desactivar el asistente, así como configurar el API Key de OpenAI cuando la funcionalidad de IA esté activa. Estas configuraciones se almacenarán en el navegador del usuario.
- En el detalle de cada tarea no completada, el usuario podrá usar el asistente de IA para obtener una sugerencia sobre cómo completar la tarea en base a su información (ej. plan de acción, pasos a seguir, etc.).

**Extras:**

- La aplicación desarrollada es una PWA.
-	La aplicación desarrollada es responsiva.
-	La aplicación permite manejar tema claro y oscuro.
-	Se crearon pruebas unitarias para el componente encargado de mostrar las tareas de la aplicación.
-	Se creó una prueba de integración para validar la creación de tareas y su despliegue en la lista de tareas.
- Se creó flujos de despliegue automatizado para la aplicación en GitHub Actions (CI/CD).

## Pre-requisitos

- [Node.js](https://nodejs.org/en/download/)
- [Angular CLI](https://angular.io/cli)
- [OpenAI API Key](https://beta.openai.com/)

## Instalación

1. Clona el repositorio
2. Instala los paquetes NPM:
    ```sh
    npm install
    ```

## Desarrollo

Ejecuta `ng serve` para levantar el servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos de código fuente.

## Construcción

Ejecuta `ng build` para construir/empaquetar el proyecto. Los artefactos de construcción se almacenarán en el directorio `dist/`.

## Ejecución de pruebas unitarias

Ejecuta `ng test` para ejecutar las pruebas unitarias usando [Karma](https://karma-runner.github.io).

## Ejecución de pruebas de integración

Ejecuta `ng e2e` para ejecutar las pruebas de integración usando [Cypress](https://www.cypress.io/).
