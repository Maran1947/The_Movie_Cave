import React, { useState } from 'react'
import requests from '../request';
import axios from '../axios';
import './SearchMovies.css';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

const base_img_url = "https://image.tmdb.org/t/p/original/";

function SearchMovies() {

    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);

    const [state, setState] = React.useState({ open: false, movie: '' });

    const handleToClose = () => {
        setState({open:false, movie: ''});
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (search) {
            const url = `${requests.fetchSearchMovies}${search}`;
            // console.log(url);
            async function fetchMovies() {
                const response = await axios.get(url);
                setMovies(response.data.results);
            }
            fetchMovies();
        }
    }

    // console.log(search);
    const handleClick = (movie) => {
        // console.log(movie);
        setState({ open: true, movie: movie });
    }
    return (
        <div className="search_movies_box">

            <div className="search_movie">
                <div className="search_input">
                    <form name="form" onSubmit={(e) => handleOnSubmit(e)}>
                        <input
                            type="text"
                            name="movie"
                            placeholder="Search movie ... "
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            required
                        />
                        <button type="submit">search</button>
                    </form>
                </div>
            </div>

            <div className="movies_box">
                {movies.length > 0 ? movies.map((movie) => {
                    return (
                        <div className="movie_content" key={movie.id}>
                            <div className="movie_poster">
                                <img
                                    key={movie.id}
                                    onClick={() => handleClick(movie)}
                                    src={(movie?.poster_path || movie?.backdrop_path) && `${base_img_url}${movie.poster_path || movie.backdrop_path}`}
                                    className={`row_poster`}
                                    alt={movie.name}
                                />
                            </div>
                            <div className="movie_footer">
                                <div className="movie_footer_name">
                                    {movie.title} {movie?.release_date && `(${new Date(movie.release_date).getFullYear()})`}
                                </div>
                                <div className="movie_footer__rating">{movie.vote_average}</div>
                            </div>
                        </div>
                    );
                }) : <div className="no_movies">
                    <h1>Oops! there's nothing</h1>
                </div>}
                <Dialog className="dialog" open={state.open} onClose={handleToClose}>
                    <DialogTitle className="dialog_title">{state.movie.title}</DialogTitle>
                    <DialogContent className="dialog_content"t>
                        <img
                            key={state.movie.id}
                            src={(state.movie?.poster_path || state.movie?.backdrop_path) && `${base_img_url}${state.movie.backdrop_path || state.movie.poster_path}`}
                            className={`row_poster`}
                            alt={state.movie.name}
                        />
                        <DialogContentText className="dialog_content_text">
                            {state.movie.overview}
                            <div className="dialog_status">
                            <h2>Rating: <span>{state.movie.vote_average}/10</span></h2>
                            <h2>Release date: <span>{state.movie?.release_date && `${new Date(state.movie.release_date).getFullYear()}`}</span></h2>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleToClose}
                            color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default SearchMovies;
