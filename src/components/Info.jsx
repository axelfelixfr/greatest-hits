import React from 'react';
import PropTypes from 'prop-types';

export const Info = ({ info }) => {
  if (Object.keys(info).length === 0) return null;

  const {
    strArtist,
    strArtistThumb,
    strGenre,
    strBiographyES,
    strBiographyEN,
    strFacebook,
    strTwitter,
    strLastFMChart
  } = info;

  // Si la biografía no esta en español, muestra la original (EN)
  const biographyArtist = strBiographyES ? strBiographyES : strBiographyEN;

  // Si no hay genero, entonces muestra 'Género desconocido'
  const genreArtist = strGenre ? `Género: ${strGenre}` : 'Género desconocido';

  return (
    <div className="card border-light">
      <div className="card-header bg-danger text-light font-weight-bold">
        Información Artista
      </div>

      <div className="card-body">
        <img className="img-artist" src={strArtistThumb} alt={strArtist} />
        <p className="card-text">{genreArtist}</p>
        <h2 className="card-text">Biografía</h2>
        <p className="card-text">{biographyArtist}</p>
        {strFacebook && strTwitter && strLastFMChart && (
          <p className="card-text">
            <a
              href={`https://${strFacebook}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href={`https://${strTwitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href={`${strLastFMChart}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-lastfm"></i>
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

Info.propTypes = {
  info: PropTypes.object.isRequired
};
