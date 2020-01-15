// Variables
let match  = [];
let timer  = 1;
let total  = 0;
let moves  = 1;
let start  = false;
let gameLevel = 0;
let images = [];

// Start game
function startGame() {

	// Get default name
	let name = document.getElementById('name');

	if (name.innerHTML == 'John Doe' || name.innerHTML == '') {
		// Get inputs
		let newName = document.getElementById('username').value;
		let level 	= document.getElementById('difficulty').value;

		// New name not set
		if (newName.trim() == '') return alert('Please enter your name');

		// Set new name
		name.innerHTML = newName;

		// Set difficulty
		setDifficultyLevel(level);
		gameLevel = images.length;

		// Hide profile
		document.getElementsByClassName('profile')[0].style.display = 'none';
	}

	// Toggle pause
	start = !start;

	// Toggle
	toggleBtn();
}

function toggleBtn() {
	let btn = document.getElementsByClassName('btn-start')[0];
	start ? btn.innerHTML = 'Pause' : btn.innerHTML = 'Start'
} 

function setDifficultyLevel(level) {
	let count = 1;
	for (let i = 0; i < level; i++) {
		images.push(count);
		images.push(count);
		count++;
	}

	createCards();
}

function createCards() {
	let parent = document.getElementsByClassName('container')[0];

	for (let i = 0; i < images.length; i++) {
		// container for elements
		let item = document.createElement('div');
		item.setAttribute('class', 'item');

		// Cover
		let cover = document.createElement('div');
		cover.setAttribute('onclick', 'unfold(this)');
		cover.setAttribute('class', 'cover');

		parent.append(item);
		item.append(cover);
	}
}

function randomNumber() {
	return images.sort(() => Math.random() - 0.5)[0];
}

function unfold(cover) {

	if (!start) return;

	let parent = cover.parentElement;

	createImage(parent);
	isMatch();

	cover.style.display = 'none';

	// Moves
	document.getElementById('moves').innerHTML = moves;
	moves++;

	// Game finish
	if (total == gameLevel/2) {
		setTimeout(() => {
			alert('Congratulations you finished in: '+ formatSeconds(timer) + ' - '+ moves +': Moves');
			document.getElementsByClassName('profile')[0].style.display = 'block';
			document.getElementsByClassName('container')[0].innerHTML = '';
			document.getElementById('name').innerHTML = 'John Doe';
			document.getElementById('username').value = '';
			start = false;
			total = 0;
			moves = 1;
			timer = 0;

			toggleBtn();
		}, 300);
	}
}

function createImage(parent) {
	let img = parent.getElementsByTagName('img');
	let n = randomNumber();

	// Display image if image exists.
	if (img.length) {
		img[0].style.display = 'block';
		n = getCoverNumber(img[0].parentElement);
		match.push(n);
		return;
	}

	// Create image if image doesn't exists.
	let newImg = document.createElement('img');
	newImg.setAttribute('src', 'imgs/'+ n +'.png');

	// Append new class name
	parent.getElementsByTagName('div')[0].classList.add('cover-'+ n);

	parent.append(newImg);
	images.splice(images.indexOf(n), 1);

	match.push(n);
}

function isMatch() {
	if (match.length == 2) {
		if (match[0] !== match[1]) hide(match[0], match[1]);
		if (match[0] == match[1]) total++;
		match = [];
	}
}

function hide(el1, el2) {
	let cover1 = document.getElementsByClassName('cover-'+ el1);
	let cover2 = document.getElementsByClassName('cover-'+ el2);

	setTimeout(() => {
		closeCover(cover1);
		closeCover(cover2);
	}, 500);
}

function getCoverNumber(parent) {
	let cover = parent.getElementsByClassName('cover')[0];
	let n = cover.classList[1];
	return parseInt(n.split('-')[1]);
}

function closeCover(cover) {
	for (let i = 0; i < cover.length; i++) {
		cover[i].style.display = 'block';
	}
}

setInterval(() => {
	if (start) {
		document.getElementById('timer').innerHTML = formatSeconds(timer);
		timer++;
	}
}, 1000);

function formatSeconds(seconds){
	return(seconds-(seconds%=60))/60+(9<seconds?':':':0')+seconds
}

module.exports = {
	match, timer, total, moves, start, gameLevel, images,
	createCards, unfold, startGame, toggleBtn, setDifficultyLevel
}