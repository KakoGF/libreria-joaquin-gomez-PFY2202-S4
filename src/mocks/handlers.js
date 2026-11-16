import { http, HttpResponse, delay } from "msw";

const categorias = [
  {
    id: "ficcion",
    nombre: "Ficción",
    descripcion: "Novelas y cuentos de autores clásicos y actuales",
  },
  {
    id: "ciencia-ficcion",
    nombre: "Ciencia Ficción",
    descripcion: "Historias de futuros posibles, robots y viajes espaciales",
  },
  {
    id: "fantasia",
    nombre: "Fantasía",
    descripcion: "Mundos mágicos, criaturas y grandes aventuras",
  },
  {
    id: "historia",
    nombre: "Historia",
    descripcion: "Libros para entender el pasado de Chile y del mundo",
  },
  {
    id: "infantil",
    nombre: "Infantil",
    descripcion: "Lecturas para los más pequeños de la casa",
  },
];

const librosPorCategoria = {
  ficcion: [
    { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", precio: 15990 },
    { id: 2, titulo: "La casa de los espíritus", autor: "Isabel Allende", precio: 13990 },
    { id: 3, titulo: "Rayuela", autor: "Julio Cortázar", precio: 14990 },
    { id: 4, titulo: "Los detectives salvajes", autor: "Roberto Bolaño", precio: 17990 },
  ],
  "ciencia-ficcion": [
    { id: 5, titulo: "Dune", autor: "Frank Herbert", precio: 18990 },
    { id: 6, titulo: "Fundación", autor: "Isaac Asimov", precio: 12990 },
    { id: 7, titulo: "Fahrenheit 451", autor: "Ray Bradbury", precio: 10990 },
    { id: 8, titulo: "Neuromante", autor: "William Gibson", precio: 13990 },
  ],
  fantasia: [
    { id: 9, titulo: "El Hobbit", autor: "J. R. R. Tolkien", precio: 14990 },
    { id: 10, titulo: "Un mago de Terramar", autor: "Ursula K. Le Guin", precio: 11990 },
    { id: 11, titulo: "El nombre del viento", autor: "Patrick Rothfuss", precio: 19990 },
  ],
  historia: [
    { id: 12, titulo: "Historia de Chile 1808-2017", autor: "Sofía Correa y otros", precio: 21990 },
    { id: 13, titulo: "Sapiens", autor: "Yuval Noah Harari", precio: 16990 },
    { id: 14, titulo: "SPQR: una historia de la antigua Roma", autor: "Mary Beard", precio: 22990 },
  ],
  infantil: [],
};

let historiaYaFallo = false;

export const handlers = [
  http.get("/api/categorias", async () => {
    await delay(1000);

    return HttpResponse.json(categorias);
  }),

  http.get("/api/libros", async ({ request }) => {
    await delay(1000);

    const url = new URL(request.url);
    const categoria = url.searchParams.get("categoria");

    if (categoria === "historia" && !historiaYaFallo) {
      historiaYaFallo = true;

      return HttpResponse.json(
        { mensaje: "Error interno del servidor" },
        { status: 500 }
      );
    }

    const libros = librosPorCategoria[categoria];

    if (!libros) {
      return HttpResponse.json(
        { mensaje: "La categoría solicitada no existe" },
        { status: 404 }
      );
    }

    return HttpResponse.json(libros);
  }),
];
