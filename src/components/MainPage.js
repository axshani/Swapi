import React, { useState, useEffect } from 'react';
import { getAllMovies } from "../services/api";
import { MovieCard } from './MovieCard';
import { Header } from './Header';

export default function MovieList() {
    const [movies, setMovies] = useState([])

    useEffect(async () => {
        const fetechedMovies = await getAllMovies()
        setMovies(fetechedMovies)
    }, [])

    return (
        <div>
            <Header title={"Star Wars Movies"} />
            <div className="mt-5">
                <div className="card-deck">
                    {
                        movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
                    }
                </div>
            </div>
        </div>
    );
};