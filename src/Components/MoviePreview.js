import React from 'react'
import '../CSS/MoviePreview.css'
import { Link } from "react-router-dom"
import { withRouter } from "react-router"
import loadingGif from '../assets/loading.gif'
import NotFav from '../assets/NotFav.png'
import favorite from '../assets/favorite.png'



class MoviePreview extends React.Component {
  constructor() {
    super()
    this.state = {
      movie: {},
      isLoading: true
    }
  }

  componentDidMount() {
    const id = this.props.match.params.movie_id;
    if(sessionStorage.token) {
      // Get back full movie object with the extra api attribute that allows user to "favorite": true/false
      fetch(`https://foxc-movies-api.herokuapp.com/api/v1/favorites/${id}`, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        this.setState({movie: data, isLoading: false})
      })
    } else { //if not logged in will fetch this
      fetch(`https://foxc-movies-api.herokuapp.com/api/v1/movies/${id}`)
        .then(response => response.json())
        .then(data => {
          this.setState({movie: data, isLoading: false})
        })
    }
  }

  postFavorite = (event) => {
    event.preventDefault()
    const url = 'https://foxc-movies-api.herokuapp.com/api/v1/favorites'
    fetch(url, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
        "Authorization": `Bearer ${sessionStorage.token}`
			},
			body: JSON.stringify({
				favorite: {
					movie_id: this.state.movie.id
				}
			})
		})
    .then(response => response.json())
    .then(data => {
      this.setState((prevState) => {
        return {
          movie: {
            ...prevState.movie,
            favorite: true
          }
        }
      })
    })
  }

  deleteFavorite = (event) => {
    event.preventDefault()
    const url = `https://foxc-movies-api.herokuapp.com/api/v1/favorites/${this.state.movie.id}`
    fetch(url, {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json',
        "Authorization": `Bearer ${sessionStorage.token}`
			}
		})
    .then(response => response.json())
    .then(data => {
      this.setState((prevState) => {
        return {
          movie: {
            ...prevState.movie,
            favorite: false
          }
        }
      })
    })
  }

  render() {
    const movie = this.state.movie
		const { title, runtime, genres, vote_average, tagline, overview, poster_path, backdrop_path, id } = movie
    return (
      <div>
        {this.state.isLoading ? <img className="loading-gif" src={loadingGif}/> : 
          <section className="preview-container" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`}}>
            <div className="preview">
              <article className="display-left">
                <img className="movie-image" src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={title}></img>
              </article>
              <article className="display-right">
                <h2 className="movie-title">{title}</h2>
                <p className="movie-runtime">Runtime: {runtime} minutes</p>
                <p className="movie-genres">{genres[0].name}</p>
                <p className="movie-info">Average: {vote_average * 10}%</p><br></br>
                <h4 className="movie-tagline">{tagline}</h4><br></br>
								<h2 className="overview-header">Overview:</h2>
                <p className="movie-overview">{overview}</p>
                {movie.favorite && <p className="movie-favorite"></p> }
                <Link to="/" type="button">
                  <button className="back-button">Back to Main 💀</button>
                </Link>
                {!this.state.movie.favorite ? <img src={NotFav} className="fav-img" onClick={(event) => this.postFavorite(event)}></img> :
                  <img src={favorite} className="fav-img" onClick={(event) => this.deleteFavorite(event)}></img>
                } 
              </article>
            </div>
          </section>
        }

      </div>
    )
  }
}

export default withRouter(MoviePreview)