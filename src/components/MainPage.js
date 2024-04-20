import React, { useState, useEffect, useRef } from 'react';
import { getAllMovies } from "../services/api";
import { MovieCard } from './MovieCard';
import { Header } from './Header';
import { useDebounce } from '../hooks/useDebounce'
import { sringIncluded } from '../utils/stringUtils'

export default function MovieList() {
    const [movies, setMovies] = useState([])
    const firstFetchedMovies = useRef()
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value, 500);

    useEffect(async () => {
        const fetchedMovies = await getAllMovies()
        setMovies(fetchedMovies)
        firstFetchedMovies.current = fetchedMovies
    }, [])

    useEffect(() => {
        if (firstFetchedMovies.current) {
            const displayedMovies = firstFetchedMovies.current.filter(m => sringIncluded(m.title, debouncedValue))
            setMovies(displayedMovies)
        }
    }, [debouncedValue]);

    return (
        <div>
            <Header title={"Star Wars Movies"} />
            <div className="mt-5">
                <label>Filter: </label>
                <input value={value} onChange={(e) => setValue(e.target.value)} />
                <div className="card-deck">
                    {
                        movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
                    }
                </div>
            </div>
        </div>
    );
};