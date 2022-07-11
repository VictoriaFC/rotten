import React from 'react'
import '../CSS/Header.css'
import background from '../assets/header-background.jpeg'

const Header = () => {
	return (
		<div className="header-container" style={{backgroundImage: `url('https://data.whicdn.com/images/360077678/original.gif')`}}>
			<h2 className="header-welcome"><b>WELCOME TO SCREAM STREAMS</b></h2><br></br>
			<p className="header-message"><b>Walls have ears. Doors have eyes. Trees have voices. Beasts tell lies. Beware the rain. Beware the snow. Beware the man you think you know.</b></p>
		</div>
	)
}

export default Header