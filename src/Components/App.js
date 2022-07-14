import React, { Component } from 'react'
import '../CSS/App.css'
import Movies from './Movies'
import MoviePreview from './MoviePreview'
import Nav from './Nav'
import Login from './Login'
import Logout from './Logout'
import Favorites from './Favorites'
import Signup from './Signup'
import Header from './Header'
import Footer from './Footer'
import loadingGif from '../assets/loading.gif'
import { Route, Switch } from 'react-router-dom';

// pages
import Consent from './Consent'
import { Redirect } from 'react-router-dom'



class App extends Component {
	constructor() {
		super()
		this.state = {
			movies: [],
			innerWidth: window.innerWidth, 
			error: '',
      isLoading: true,
      isOfAge: false
		}
	}

  componentDidMount(){
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=44887bea2881cacd3e7aa9c9a1e39222&with_genres=27")
    .then(response => response.json())
    .then(data => {
      this.setState({movies: data.results, isLoading: false,})
    })
		.catch(error => { 
			this.setState({error: error.message})
		})
  }

  userDidConsent = () => {
    return this.setState({ isOfAge: true })
  }

  render(){
    return(
      <main className="App">
				<Nav />
				{this.state.error && <h3>{this.state.error}</h3>}
        {this.state.isLoading && <img className="loading-gif" src={loadingGif}/>}
        {!this.state.isOfAge && <Redirect to="/Consent" />}
        <Switch>
          <Route exact path="/">
            <Header />
            <Movies movies={this.state.movies} />
          </Route>
          <Route exact path="/Consent">
            <Consent consent={this.userDidConsent}/>
          </Route>
          {/* <Route exact path="/Login">
            <Login />
          </Route> */}
          {/* <Route exact path="/Logout">
            <Logout />
          </Route>
          <Route exact path="/Signup">
            <Signup />
          </Route> */}
          {/* <Route exact path="/Favorites">
            <Favorites movies={this.state.movies} />
          </Route> */}
          <Route exact path="/MoviePreview/:movie_id">
            <MoviePreview />
          </Route>
        </Switch>
			<Footer />
      </main>
    )
  }	
}

export default App
