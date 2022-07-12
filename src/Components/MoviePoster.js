import React from 'react'
import '../CSS/MoviePoster.css'
import { Link } from "react-router-dom"

const MoviePoster = ({id, title, posterImage, average}) => {
	return (
    <article className="movie-poster">
      <Link className="movie-poster" to={`/MoviePreview/${id}`} >
        <img className="image" src={posterImage} alt={title}></img>
      </Link>
      <h3>{title}</h3>
      <p><b>Rating: {average}</b></p>
    </article>
	)
}

export default MoviePoster