import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Movie() {
    const baseurl = "https://image.tmdb.org/t/p/w500/";
    const [movie, setMovie] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [expandedItem, setExpandedItem] = useState(null);

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

    const handleReadMoreClick = (itemId) => {
        if (expandedItem === itemId) {
            setExpandedItem(null);
        } else {
            setExpandedItem(itemId);
        }
    }

    return (
        <div className='App'>
            <div className='container'>
                <div className='row'>
               
                  

                    <div className='seo'>

                        <input
                            type='text'
                            placeholder='Search movies ...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className='searchbutton' onClick={handleSearch}><span className='spa'>Search</span></button>
                        <h1 style={{fontFamily:"times", marginTop:"20px", color:"green", fontWeight:"900"}}>(TRENDING)</h1>
                        
                    </div>
                    
                    {(searchResults.length > 0 ? searchResults : movie).map((item) => (
                        <div key={item.id} className='card col-lg-3 mt-5 mb-5'>
                            
                            <div>
                            
                                <img src={`${baseurl}${item.poster_path}`} className='img-fluid' alt='...' />
                                <div className='card-body '>
                                    <h3 style={{color:"brown"}}>{item.name || item.title}</h3>    
                                    <h5>Rating: {item.vote_average}</h5>
                                    <h6 style={{color:"orangered"}}>Language: ({item.original_language})</h6>
                                    <button onClick={() => handleReadMoreClick(item.id)} style={{backgroundColor:"green", color:"wheat"}}>Read More</button>
                                    {expandedItem === item.id && (
                                        <div>
                                            <p> <span style={{color:"red"}}>Release Date:</span> {item.release_date || item.first_air_date}</p>
                                            <p> <span style={{color:"green", fontWeight:"900"}}>Overview:</span> {item.overview}</p>
                                            {/* You might need to fetch genre and cast information */}
                                        </div>
                                    )}
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


