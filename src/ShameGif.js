import React from 'react';
import './App.css';
import './css/bootstrap.css';
import './css/bootstrap-grid.css';

function getURL() {
	const urls = [
		"https://tenor.com/view/for-shame-sylvester-cat-shame-gif-10870483.gif",
		"https://tenor.com/view/shame-corner-spiderman-gif-3954726.gif",
		"https://tenor.com/view/shame-cube-shame-gif-10245091.gif",
		"https://tenor.com/view/shame-box-of-shame-gif-3862824.gif",
		"https://tenor.com/view/shame-game-of-thrones-got-gif-5354407.gif"
	]
	return urls[Math.floor(Math.random() * urls.length)] 
}

function ShameGif(props) {
	var url = getURL()
	return(
		<center>
		<img src={url} alt="Shame GIF" />
		</center>
	 )
}
export default ShameGif