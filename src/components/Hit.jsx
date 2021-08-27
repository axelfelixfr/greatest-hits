import React from 'react';
import PropTypes from 'prop-types';

export const Hit = ({ hit }) => {
  // Se desestructura el hit que se obtuvo
  const { full_title, song_art_image_thumbnail_url, title, url } = hit;

  // Quitamos los espacios del título
  const idHeading = full_title.replace(/\s+/g, '');

  return (
    <div className="card">
      <div className="card-header" id={idHeading}>
        <h2 className="mb-0">
          <small>
            {full_title} <i className="fas fa-compact-disc"></i>
          </small>
        </h2>
      </div>

      <div className="collapse show">
        <div className="card-body">
          <div className="media position-relative">
            <img
              src={song_art_image_thumbnail_url}
              className="mr-3 img-thumbnail img-album"
              alt={full_title}
            />
            <div className="media-body">
              <h5 className="mt-0 text-left mx-auto">{title}</h5>
              <a
                href={url}
                className="btn btn-danger button-music"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver letra <i className="fab fa-itunes-note fa-size-xs"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Hit.propTypes = {
  hit: PropTypes.object.isRequired
};
