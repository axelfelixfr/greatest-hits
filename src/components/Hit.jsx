import React from 'react';

export const Hit = ({ hit }) => {
  const { full_title, song_art_image_thumbnail_url, title, url } = hit;

  const idHeading = full_title.replace(/\s+/g, '');

  return (
    <div className="card">
      <div className="card-header" id={idHeading}>
        <h2 className="mb-0">
          <small>{full_title}</small>
        </h2>
      </div>

      <div className="collapse show">
        <div className="card-body">
          <div class="media position-relative">
            <img
              src={song_art_image_thumbnail_url}
              class="mr-3 img-thumbnail img-album"
              alt={full_title}
            />
            <div class="media-body">
              <h5 class="mt-0">{title}</h5>
              <p>Lyrics:</p>
              <a href="#!" class="stretched-link">
                {url}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
