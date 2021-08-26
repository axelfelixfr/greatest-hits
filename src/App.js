import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form } from './components/Form';

function App() {
  // Definir el state
  // const [searchLyrics, setSearchLyrics] = useState({});
  const [searchArtist, setSearchArtist] = useState('');

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

      if (!hits.length) {
        return console.log('NO hay resultados');
      }
      console.log(status, hits);
      // const options = {
      //   method: 'GET',
      //   url: 'https://genius.p.rapidapi.com/search',
      //   params: { q: artist },
      //   headers: {
      //     'x-rapidapi-host': 'genius.p.rapidapi.com',
      //     'x-rapidapi-key': apiKey
      //   }
      // };

      // axios
      //   .request(options)
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.error(error);
      //   });
    };

    consultLyrics();
  }, [searchArtist]);

  return (
    <>
      <Form setSearchArtist={setSearchArtist} />
    </>
  );
}

export default App;
