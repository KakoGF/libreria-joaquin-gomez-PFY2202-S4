import { Link } from "react-router";

export default function PaginaNoEncontrada() {
  return (
    <section>
      <h1>Página no encontrada</h1>

      <p>La dirección que escribiste no existe en la librería.</p>

      <Link to="/">Volver al inicio</Link>
    </section>
  );
}
