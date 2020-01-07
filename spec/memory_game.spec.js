const jsdom = require('jsdom')       
const {JSDOM} = jsdom;

describe('Memory game', function () {

   beforeEach(() => {
      const dom = new JSDOM(`
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
			</body>
			</html>
      `);

      global.window = dom.window;
      global.document = dom.window.document;
   });

   it('Should return John Doe', function () {
   	expect(global.document.getElementById("name").innerHTML).toBe(`John Doe`);
   });

   it('Should return 0:00', function () {
   	expect(global.document.getElementById("timer").innerHTML).toBe(`0:00`);
   });

   it('Should return 0', function () {
   	expect(global.document.getElementById("moves").innerHTML).toBe(`0`);
   });

});