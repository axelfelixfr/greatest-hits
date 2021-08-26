import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';

export const Form = () => {
  const [error, setError] = useState(false);

  const initialState = {
    artist: '',
    song: ''
  };

  const [values, handleInputChange] = useForm(initialState);

  const { artist, song } = values;

  // Consultar apis
  const handleSubmit = e => {
    e.preventDefault();

    if (artist.trim() === '' || song.trim() === '') {
      setError(true);
      return;
    }

    setError(false);
  };

  return (
    <div className="bg-info">
      <div className="container">
        <div className="row">
          <form
            onSubmit={handleSubmit}
            className="col card text-white bg-transparent mb-5 pt-5 pb-2"
          >
            <fielset>
              <legend className="text-center">
                Buscador letras y canciones
              </legend>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="artist">Artista</label>
                    <input
                      type="text"
                      name="artist"
                      className="form-control"
                      onChange={handleInputChange}
                      placeholder="Nombre del artista"
                      value={artist}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="song">Canción</label>
                    <input
                      type="text"
                      name="song"
                      className="form-control"
                      onChange={handleInputChange}
                      placeholder="Nombre de la canción"
                      value={song}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-danger float-right">
                Buscar
              </button>
            </fielset>
          </form>
        </div>
      </div>
    </div>
  );
};
