
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

function Movie() {
    const baseurl = "https://image.tmdb.org/t/p/w500/"
    const [movie, setmovie] = useState([])

    useEffect(() => {
        const key = "a201574ce973b68d67d8bcea339602d8"
        const getmoviedata = async () => {
            const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}`);
         setmovie(res.data.results);
        }
        getmoviedata();

    }, [])

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    {movie.map((item) => {
                        return (
                          <div key={item.id} className='card col-lg-3 mt-5 mb-5'>
                           <div >
                            <img src={`${baseurl}${item.poster_path}`} className='img-fluid' alt="..." />
                            <div className='card-body'>
                                <h3> {item.name} </h3>
                                <h3> {item.title} </h3>
                                <h5>Rating: {item.vote_average}</h5>
                                <h6> language : ({item.original_language} )</h6>
                             <h1> </h1>
                            </div>

                           </div>
                          </div>

                        )
                    })}

                </div>
            </div>

        </div>
    )
}

export default Movie













































import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Movie() {
    const baseurl = "https://image.tmdb.org/t/p/w500/";
    const [movie, setMovie] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const key = "a201574ce973b68d67d8bcea339602d8";
        const getMovieData = async () => {
            const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}`);
            setMovie(res.data.results);
        }
        getMovieData();
    }, []);

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }

        const key = "a201574ce973b68d67d8bcea339602d8";
        const res = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${key}&query=${searchQuery}`);
        setSearchResults(res.data.results);
    }

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 mb-4'>
                        <input
                            type='text'
                            placeholder='Search movies and TV shows...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className='btn btn-primary ml-2' onClick={handleSearch}>Search</button>
                    </div>
                    {(searchResults.length > 0 ? searchResults : movie).map((item) => (
                        <div key={item.id} className='card col-lg-3 mt-5 mb-5'>
                            <div>
                                <img src={`${baseurl}${item.poster_path}`} className='img-fluid' alt='...' />
                                <div className='card-body'>
                                    <h3>{item.name || item.title}</h3>
                                    <h5>Rating: {item.vote_average}</h5>
                                    <h6>Language: ({item.original_language})</h6>
                                    <p>Release Date: {item.release_date || item.first_air_date}</p>
                                    <p>Overview: {item.overview}</p>
                                    {/* You might need to fetch genre and cast information */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Movie;