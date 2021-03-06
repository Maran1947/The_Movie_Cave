import React, { useState, useEffect } from 'react'
import axios from '../axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_img_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    useEffect(() => {
        async function fetchMovies() {
            const response = await axios.get(fetchUrl);
            setMovies(response.data.results);
            return response;
        }
        fetchMovies();
    }, [fetchUrl]);
    
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        },
    };

    const handleClick = (movie) => {
        // console.log(movie);
        if(trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.original_title  || "")
            .then((url) => {
                // console.log(url);
                const urlParams = new URLSearchParams(new URL(url).search);
                // console.log(urlParams)
                setTrailerUrl(urlParams.get('v'));
            }).catch((error) => console.log(error));
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map((movie) => {
                    return <img
                        key={movie.id}
                        onClick={()=>handleClick(movie)}
                        src={`${base_img_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        className={`row_poster ${isLargeRow && "row_posterLarge"} `}
                        alt={movie.name} />
                })}
            </div>
            {trailerUrl && <YouTube
                videoId={trailerUrl}               // defaults -> null
                opts={opts}                        // defaults -> {}
            />}
        </div>
    )
}

export default Row;
