import { Link } from "react-router";

export default function Categorias({
  categorias,
  cargando,
  error,
  cargarCategorias,
}) {
  return (
    <section>
      <h1>Categorías de libros</h1>

      <div className="acciones">
        <button onClick={() => cargarCategorias()} disabled={cargando}>
          Actualizar categorías
        </button>
      </div>

      {cargando && <p role="status">Cargando categorías...</p>}

      {error && (
        <div className="error" role="alert">
          <p>{error}</p>

          <button onClick={() => cargarCategorias()} disabled={cargando}>
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && categorias.length === 0 && (
        <p>No hay categorías disponibles por el momento.</p>
      )}

      {!cargando && error && categorias.length > 0 && (
        <p>Mientras tanto, puedes revisar las últimas categorías cargadas.</p>
      )}

      {!cargando && categorias.length > 0 && (
        <div className="tarjetas">
          {categorias.map((categoria) => (
            <article className="tarjeta" key={categoria.id}>
              <h2>{categoria.nombre}</h2>
              <p>{categoria.descripcion}</p>
              <Link to={`/categorias/${categoria.id}`}>Ver libros</Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
