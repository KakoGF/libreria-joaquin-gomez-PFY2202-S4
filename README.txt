LIBRERIA KAKO
Desarrollo Frontend II (PFY2202) - Experiencia 2, Semana 4
Joaquin Gomez

De que se trata
---------------
Es una tienda de libros hecha con React. El usuario puede ver las categorias
de libros y entrar a cada una para ver los libros que tiene.

Los datos no estan escritos dentro de los componentes. Se piden a una API REST
simulada (mock) hecha con MSW, que responde como si fuera un backend real.

Que tiene
---------
- Navegacion con React Router: inicio, categorias, libros de una categoria
  y una pagina para las direcciones que no existen.
- Un servicio mock REST con dos consultas: una para las categorias y otra
  para los libros de una categoria.
- Mensaje de "Cargando..." mientras se espera la respuesta.
- Mensajes de error cuando la consulta falla (404, 500 o sin conexion),
  con un boton para reintentar.
- Las categorias se piden una sola vez, y los libros de una categoria que ya
  se visito no se vuelven a pedir.

Como ejecutarlo
---------------
Se necesita tener Node.js instalado. En la terminal, dentro de la carpeta
del proyecto:

    npm install
    npm run dev

Despues se abre en el navegador la direccion que muestra la terminal.

Importante: el servicio mock solo funciona en modo desarrollo (npm run dev).

Como probarlo
-------------
1. Entrar a Categorias y esperar que carguen.
2. Entrar a una categoria para ver sus libros.
3. Entrar a la categoria Historia. El servicio mock esta hecho para que
   falle la primera vez con un error 500. Aparece el mensaje de error y
   al apretar "Reintentar" los libros cargan bien.
4. La categoria Infantil no tiene libros, para ver el mensaje de lista vacia.
5. Escribir en la direccion una categoria que no existe (por ejemplo
   /categorias/terror) para ver el mensaje de error y el boton Reintentar.
6. Escribir una direccion que no existe para ver la pagina no encontrada.

Tecnologias
-----------
React, Vite, React Router y MSW (Mock Service Worker).
