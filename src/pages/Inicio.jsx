import { Link } from "react-router";

export default function Inicio() {
  return (
    <section>
      <h1>Bienvenido a Librería Kako</h1>

      <p>
        Explora nuestras categorías de libros y encuentra tu próxima lectura.
      </p>

      <Link to="/categorias">Explorar categorías</Link>
    </section>
  );
}
