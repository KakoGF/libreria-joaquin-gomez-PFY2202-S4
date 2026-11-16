import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { obtenerLibros } from "../servicios/api";

export default function Libros({ categorias, librosGuardados, guardarLibros }) {
  const { categoria } = useParams();
  const guardados = librosGuardados[categoria];

  const [libros, setLibros] = useState(guardados || []);
  const [cargando, setCargando] = useState(!guardados);
  const [error, setError] = useState("");

  const categoriaActual = categorias.find((item) => item.id === categoria);
  const nombreCategoria = categoriaActual ? categoriaActual.nombre : categoria;

  const cargarLibros = useCallback(
    () => {
      setCargando(true);
      setError("");

      obtenerLibros(categoria)
        .then((data) => {
          setLibros(data);
          guardarLibros(categoria, data);
        })
        .catch((error) => setError(error.message))
        .finally(() => setCargando(false));
    },
    [categoria, guardarLibros]
  );

  useEffect(() => {
    if (guardados) {
      return;
    }

    const controlador = new AbortController();

    obtenerLibros(categoria, controlador.signal)
      .then((data) => {
        setLibros(data);
        setCargando(false);
        guardarLibros(categoria, data);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setError(error.message);
          setCargando(false);
        }
      });

    return () => {
      controlador.abort();
    };
  }, [categoria, guardados, guardarLibros]);

  return (
    <section>
      <h1>Libros de {nombreCategoria}</h1>

      <div className="acciones">
        <button onClick={() => cargarLibros()} disabled={cargando}>
          Actualizar libros
        </button>
      </div>

      {cargando && <p role="status">Cargando libros...</p>}

      {error && (
        <div className="error" role="alert">
          <p>{error}</p>

          <button onClick={() => cargarLibros()} disabled={cargando}>
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && libros.length === 0 && (
        <p>No hay libros disponibles en esta categoría por el momento.</p>
      )}

      {!cargando && error && libros.length > 0 && (
        <p>Mientras tanto, puedes revisar los últimos libros cargados.</p>
      )}

      {!cargando && libros.length > 0 && (
        <div className="tarjetas">
          {libros.map((libro) => (
            <article className="tarjeta" key={libro.id}>
              <h2>{libro.titulo}</h2>
              <p>{libro.autor}</p>
              <p className="precio">${libro.precio.toLocaleString("es-CL")}</p>
            </article>
          ))}
        </div>
      )}

      <p>
        <Link to="/categorias">Volver a las categorías</Link>
      </p>
    </section>
  );
}
