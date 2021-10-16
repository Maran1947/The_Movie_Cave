import React, { useState, useEffect } from 'react'
import axios from '../axios';
import requests from '../request';
import './Banner.css';

function Banner() {
    const [movie, setMovie] = useState([]);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0,n-1)+"...":str;
    }

    useEffect(()=>{
        async function fetchMovies() {
            const response = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                response.data.results[
                    Math.floor(Math.random() * response.data.results.length)
                ]
            )
        }
        fetchMovies();
    },[]);
    // console.log(movie);
    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center center"
            }}
        >
            <div className="banner_contents">
                <h1>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>
                <h1 className="banner_description">
                    {truncate(movie?.overview,150)}
                </h1>
            </div>
            <div className="banner_fadeBottom" />
        </header>
    )   
}

export default Banner;
