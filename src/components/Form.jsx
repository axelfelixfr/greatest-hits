import React, { useState } from 'react';
// import { useForm } from '../hooks/useForm';

export const Form = ({ setSearchArtist }) => {
  const [error, setError] = useState(false);

  const [searchInput, setSearchInput] = useState('');

  // Consultar apis
  const handleSubmit = e => {
    e.preventDefault();

    // Validación
    if (searchInput.trim() === '') {
      setError(true);
      return;
    }

    // Paso validación
    setError(false);

    setSearchArtist(searchInput);
  };

  return (
    <div className="bg-info">
      <div className="container">
        <div className="row">
          <form
            onSubmit={handleSubmit}
            className="col card text-white bg-transparent mb-5 pt-5 pb-2"
          >
            <fieldset>
              <legend className="text-center">Grandes hits!</legend>

              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <div className="form-group">
                    <label htmlFor="artist">Busca a tu artista favorito</label>
                    <input
                      type="text"
                      name="artist"
                      className="form-control"
                      onChange={e => setSearchInput(e.target.value)}
                      placeholder="Nombre del artista"
                    />
                  </div>
                  <button type="submit" className="btn btn-danger float-right">
                    Buscar
                  </button>
                </div>
              </div>
            </fieldset>
            <div className="col-md-6 mx-auto">
              {error && (
                <p className="alert alert-danger text-center p-2 mx-5">
                  Todos los campos son obligatorios
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
