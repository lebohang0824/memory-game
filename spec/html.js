const html = `
<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>memory_game</title>
		<link rel="stylesheet" type="text/css" href="css/main.css">
	</head>
	<body>

		<div class="board">
			<div class="main">
				<ul>
					<li><b>Name:</b> <span id="name">John Doe</span></li>
					<li><b>Timer:</b> <span id="timer">0:00</span></li>
					<li><b>Moves:</b> <span id="moves">0</span></li>
				</ul>
			</div>
		</div>

		<div class="profile">
			<div class="input">
				<input type="text" id="username" placeholder="Name" autocomplete="off">
			</div>
			<div class="input">
				<select id="difficulty">
					<option value="5">Begginer</option>
					<option value="10">Intermediate</option>
					<option value="15">Pro</option>
				</select>
			</div>
		</div>

		<div class="container"></div>

		<button class="btn-start" id="btn" onclick="startGame()">Start</button>

		<script type="text/javascript" src="js/main.js"></script>
	</body>
	</html>`
module.exports = html;