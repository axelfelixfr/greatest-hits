import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form } from './components/Form';
import { GreatestHits } from './components/GreatestHits';
import { Info } from './components/Info';

function App() {
  // Definir el state
  const [searchArtist, setSearchArtist] = useState('');
  const [hitsArtist, setHitsArtist] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (searchArtist.trim() === '') return null;

    const consultArtist = async () => {
      const apiKey = process.env.REACT_APP_API_LYRICS;

      const urlHits = `https://genius.p.rapidapi.com/search?q=${searchArtist}`;

      const urlInfo = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${searchArtist}`;

      axios
        .all([
          axios.get(urlHits, {
            headers: {
              'x-rapidapi-host': 'genius.p.rapidapi.com',
              'x-rapidapi-key': apiKey
            }
          }),
          axios.get(urlInfo)
        ])
        .then(
          axios.spread(
            (
              {
                data: {
                  meta: { status },
                  response: { hits }
                }
              },
              inform
            ) => {
              if (!hits.length || status !== 200) {
                setNotFound(true);
                setHitsArtist([]);
                return;
              }
              setNotFound(false);
              setHitsArtist(hits);
              setInfo(inform.data.artists[0]);
            }
          )
        )
        .catch(error => {
          setNotFound(true);
          console.log(error);
        });
    };

    consultArtist();
  }, [searchArtist]);

  const componentsRendered = notFound ? (
    <div className="col-md-8 mx-auto">
      <p className="alert alert-danger text-center p-2 mx-5">
        No se encontro nada del artista buscado
      </p>
    </div>
  ) : (
    <>
      <div className="col-md-6">
        <Info info={info} />
      </div>
      <div className="col-md-6">
        {!!hitsArtist.length && (
          <GreatestHits hitsArtist={hitsArtist} searchArtist={searchArtist} />
        )}
      </div>
    </>
  );

  return (
    <>
      <Form setSearchArtist={setSearchArtist} />

      <div className="container">
        <div className="row my-3">{componentsRendered}</div>
      </div>
    </>
  );
}

export default App;
