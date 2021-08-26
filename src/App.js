import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form } from './components/Form';
import { GreatestHits } from './components/GreatestHits';

function App() {
  // Definir el state
  // const [searchLyrics, setSearchLyrics] = useState({});
  const [searchArtist, setSearchArtist] = useState('');
  const [hitsArtist, setHitsArtist] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (searchArtist.trim() === '') return;

    console.log('Si paso');
    const consultLyrics = async () => {
      const apiKey = process.env.REACT_APP_API_LYRICS;

      const url = `https://genius.p.rapidapi.com/search?q=${searchArtist}`;

      const {
        data: {
          meta: { status },
          response: { hits }
        }
      } = await axios.get(url, {
        headers: {
          'x-rapidapi-host': 'genius.p.rapidapi.com',
          'x-rapidapi-key': apiKey
        }
      });

      if (!hits.length || status !== 200) {
        setNotFound(true);
        return;
      }
      setNotFound(false);
      setHitsArtist(hits);
    };

    consultLyrics();
  }, [searchArtist]);

  const componentRendered = notFound ? (
    <p className="alert alert-danger text-center p-2 mx-5">
      No se encontro nada del artista buscado
    </p>
  ) : (
    <GreatestHits hitsArtist={hitsArtist} searchArtist={searchArtist} />
  );

  return (
    <>
      <Form setSearchArtist={setSearchArtist} />

      <div className="container">
        <div className="row my-3">
          <div className="col-md-6"></div>
          <div className="col-md-6">{componentRendered}</div>
        </div>
      </div>
    </>
  );
}

export default App;
