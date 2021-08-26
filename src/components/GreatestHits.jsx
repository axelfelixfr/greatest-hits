import React from 'react';
import { Hit } from './Hit';

export const GreatestHits = ({ hitsArtist, searchArtist }) => {
  return (
    <>
      <h3 className="mb-2 text-center">Lo más escuchado de {searchArtist}</h3>
      <div className="accordion">
        {hitsArtist.map(hit => (
          <Hit key={hit.result.id} hit={hit.result} />
        ))}
      </div>
    </>
  );
};
