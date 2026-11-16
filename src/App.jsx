import { useCallback, useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router";
import { obtenerCategorias } from "./servicios/api";
import Inicio from "./pages/Inicio";
import Categorias from "./pages/Categorias";
import Libros from "./pages/Libros";
import PaginaNoEncontrada from "./pages/PaginaNoEncontrada";

export default function App() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [librosGuardados, setLibrosGuardados] = useState({});

  const cargarCategorias = useCallback(() => {
    setCargando(true);
    setError("");

    obtenerCategorias()
      .then((data) => setCategorias(data))
      .catch((error) => setError(error.message))
      .finally(() => setCargando(false));
  }, []);

  const guardarLibros = useCallback((categoria, libros) => {
    setLibrosGuardados((anteriores) => ({
      ...anteriores,
      [categoria]: libros,
    }));
  }, []);

  useEffect(() => {
    const controlador = new AbortController();

    obtenerCategorias(controlador.signal)
      .then((data) => setCategorias(data))
      .catch((error) => {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      })
      .finally(() => {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      });

    return () => {
      controlador.abort();
    };
  }, []);

  return (
    <div className="contenedor">
      <header>
        <p className="marca">Librería Kako</p>

        <nav aria-label="Navegación principal">
          <NavLink to="/" end>
            Inicio
          </NavLink>

          <NavLink to="/categorias">Categorías</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />

          <Route
            path="/categorias"
            element={
              <Categorias
                categorias={categorias}
                cargando={cargando}
                error={error}
                cargarCategorias={cargarCategorias}
              />
            }
          />

          <Route
            path="/categorias/:categoria"
            element={
              <Libros
                categorias={categorias}
                librosGuardados={librosGuardados}
                guardarLibros={guardarLibros}
              />
            }
          />

          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </main>
    </div>
  );
}
