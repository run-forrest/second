import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

// fa16db5a
const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=fa16db5a"


const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    console.log(data.Search);
  }

  useEffect(() => {
    searchMovie('Spiderman');
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className='search'>
        <input placeholder='Search for movies' value={searchItem}
          onChange={(e) => { setSearchItem(e.target.value)}}
        />
        <img src={SearchIcon}
          alt='search'
          onClick={() => { searchMovie(searchItem)}}
        />
      </div>
      {
        movies?.length > 0 ? (<div className='container'>
          {movies.map((movie) => (<MovieCard movie={movie} />))}

        </div>) : <div className='empty'><h2>No movies found</h2></div>
      }

    </div>
  );
}

export default App;
