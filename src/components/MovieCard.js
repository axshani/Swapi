import React from 'react'

export const MovieCard = (props) => {
    const btnOnClick = async (func) => {
        const data = await func()
        alert(data)
    }

    return (
        <div className="movie-card">
            <div className="movie-card card">
                <div className="card-body">
                    <h4 className="card-title">{props.movie.title}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">{props.movie.subtitle}</h6>
                    <p className="text-justify" style={{ fontSize: '14px' }}>{props.movie.openingCrawl}</p>
                    <p className="text-justify" style={{ fontSize: '12px' }}>{`Release Date: ${props.movie.releaseDate},
                 Director: ${props.movie.director}, Producer: ${props.movie.producer}`}</p>
                    <button onClick={() => btnOnClick(() => props.movie.fetchAllCharacters)}>Charecters</button>
                </div>
            </div>
        </div>
    );
}
