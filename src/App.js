import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form } from './components/Form';
import { GreatestHits } from './components/GreatestHits';
import { Info } from './components/Info';

function App() {
  // Definir el state
  // State para el buscador de artistas/bandas
  const [searchArtist, setSearchArtist] = useState('');
  // State para colocar todas las canciones
  const [hitsArtist, setHitsArtist] = useState([]);
  // State para saber si se encontro al artista
  const [notFound, setNotFound] = useState(false);
  // State para colocar la biografía del artista
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (searchArtist.trim() === '') return null;

    const consultArtist = async () => {
      const apiKey = process.env.REACT_APP_API_LYRICS;

      const urlHits = `https://genius.p.rapidapi.com/search?q=${searchArtist}`;

      const urlInfo = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${searchArtist}`;

      // Se realizan ambas consultas
      axios
        .all([
          // Primera consulta a los hits
          axios.get(urlHits, {
            headers: {
              'x-rapidapi-host': 'genius.p.rapidapi.com',
              'x-rapidapi-key': apiKey
            }
          }),
          // Segunda consulta a la info
          axios.get(urlInfo)
        ])
        .then(
          // axios.spread() el parámetro de esta función de parámetro es también la respuesta de todas las solicitudes
          // En este caso queremos obtener los hits (... response: {hits}) y la información (inform)
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
              // Lo que ejecutara una vez obtenida la información
              if (!hits.length || status !== 200) {
                // Si no se encontraron hits de dicho artista, entonces setNotFound pasa a true
                setNotFound(true);
                // Y se reinicializa el state de hits
                setHitsArtist([]);
                return;
              }
              // Paso validación y si hay data que mostrar
              setNotFound(false);
              setHitsArtist(hits);
              setInfo(inform.data.artists[0]);
            }
          )
        )
        .catch(error => {
          // Cachamos los errores
          setNotFound(true);
          console.log(error);
        });
    };

    // Ejecutamos la función
    consultArtist();
  }, [searchArtist]);

  // Renderizacion condicional
  // Si no hay resultados obtenidos en la búsqueda, que muestre la alerta que no se encontro nada
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
