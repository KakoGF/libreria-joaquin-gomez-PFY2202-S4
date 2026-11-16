async function consultarApi(endpoint, signal, mensajeNoEncontrado) {
  try {
    const respuesta = await fetch(endpoint, { signal });

    if (!respuesta.ok) {
      if (respuesta.status === 404) {
        throw new Error(mensajeNoEncontrado);
      }
      if (respuesta.status === 500) {
        throw new Error(
          "El servidor tuvo un problema (error 500). Espera unos segundos y vuelve a intentarlo."
        );
      }
      throw new Error(
        `Ocurrió un error inesperado (código ${respuesta.status}).`
      );
    }

    return await respuesta.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "No se pudo conectar con el servidor. Revisa tu conexión e intenta nuevamente.",
        { cause: error }
      );
    }
    throw error;
  }
}

export function obtenerCategorias(signal) {
  return consultarApi(
    "/api/categorias",
    signal,
    "No se encontraron las categorías de la librería (error 404)."
  );
}

export function obtenerLibros(categoria, signal) {
  return consultarApi(
    `/api/libros?categoria=${categoria}`,
    signal,
    "No se encontraron libros para esta categoría (error 404). Puede que la categoría no exista."
  );
}
