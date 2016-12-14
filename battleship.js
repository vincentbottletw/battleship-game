var rows = 15;
var cols = 15;
var ship_count = 0; //how many ships set so far
var hit_to_win = 10; //total ships to hit
var square_size = 50; //each square's size in pixel
var player_turn = 1; //which player's turn? 1 or 2
var hitCount1 = 0; //hit count for player 1
var hitCount2 = 0; //hit count for player 2
var hitCount = 0; 

var InitContainer = document.getElementById("init_board");
var Container = document.getElementById("gameboard");

//initial board of 2 players, 0: empty, 1:ship part, 2: ship hit, 3: missed shot
var gameBoard;
var gameBoard1 = [
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				]

var gameBoard2 = [
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				]
//event listener for clicks to set the board
InitContainer.addEventListener("click", set_ship, false);

//event listener for clicks to fire on enemy's board
Container.addEventListener("click", fire, false);

//draw the board for player to fire
function draw_board(player){
	document.getElementById("gameboard").innerHTML = "";
	document.getElementById("player_id").innerHTML = "Player"+player+"'s turn.";
	document.getElementById("ship_count_display").innerHTML = "Please fire only one at a time.";

	//div "gameboard" is the main div for the board and append square divs inside for each col and row
	for (i = 0; i < cols; i++) {
		for (j = 0; j < rows; j++) {

			var square = document.createElement("div");
			Container.appendChild(square);
			square.id = 'pos' + j + '*' + i;	
			//use id to record the div's position on the board
			//useful for event listener to know which position has been hit	

			//set div absolute position
			var topPosition = j * square_size;
			var leftPosition = i * square_size;			
			square.style.top = topPosition + 'px';
			square.style.left = leftPosition + 'px';


			//if gameBoard matrix value is 0 or 1(not hit) then the color is default
			//else set to black meaning the position has been fired and hit
			//or dark grey meaning the position has been fired but did not hit anything
			if(player==1){
				if(gameBoard1[j][i]==2){
					square.style.background = 'black';
				}
				if(gameBoard1[j][i]==3){
					square.style.background = '#bbb';
				}
			}
			else{
				if(gameBoard2[j][i]==2){
					square.style.background = 'black';
				}
				if(gameBoard2[j][i]==3){
					square.style.background = '#bbb';
				}
			}				
		}
	}
}
//draw the board for player to set ships
function set_board(player){
	document.getElementById("init_board").innerHTML = "";
	document.getElementById("player_id").innerHTML = "Player"+player+", please click on the square to set your ship.";
	document.getElementById("start_game_button").style.display='none';
	document.getElementById("ship_count_display").innerHTML = "Ships left to put:"+(hit_to_win-ship_count);

	//div "gameboard" is the main div for the board and append square divs inside for each col and row
	for (i = 0; i < cols; i++) {
		for (j = 0; j < rows; j++) {

			var square = document.createElement("div");
			InitContainer.appendChild(square);
			square.id = 'pos' + j + '*' + i;
			//use id to record the div's position on the board
			//useful for event listener to know which position has been hit	

			//set div absolute position
			var topPosition = j * square_size;
			var leftPosition = i * square_size;			
			square.style.top = topPosition + 'px';
			square.style.left = leftPosition + 'px';

			//if gameBoard matrix value is 0(not set) then the color is default
			//else set to red meaning the position has been set for ship
			if(player==1){
				if(gameBoard1[j][i]==1){
					square.style.background = 'red';
				}
			}
			else{
				if(gameBoard2[j][i]==1){
					square.style.background = 'red';
				}
			}				
		}
	}
}

//function to react when click to set new ship on board
function set_ship(e){
	if (e.target !== e.currentTarget) {
		//set gameBoard to player's current board
		if(player_turn==1){
			gameBoard = gameBoard1;
		}
		else{
			gameBoard = gameBoard2;
		}
		//get position of div clicked
		var m = e.target.id.indexOf("*");
		var row = e.target.id.substring(3,m);
		var col = e.target.id.substring(m+1,e.target.id.length);

		if (gameBoard[row][col] == 0) {
			//if position hasn't been set, change it to 'set' 
			e.target.style.background = 'red';
			gameBoard[row][col] = 1;
			ship_count++;
			if(player_turn==1){
				gameBoard1 = gameBoard;
				set_board(1);
				//if set ship number reach max, set next board
				if(ship_count==hit_to_win){
					alert("Now it's Player2's turn to set the ships!");
					setTimeout(set_next_board, 1500);
				}
			}
			else{
				gameBoard2 = gameBoard;
				set_board(2);
				//if set ship number reach max, start game
				if(ship_count==hit_to_win){
					alert("Now we can start the game!!");
					setTimeout(set_next_board, 1500);
				}
			}

		}
	}
	e.stopPropagation();
}
//function to react when click to fire on board
function fire(e){
	if (e.target !== e.currentTarget) {
		if(player_turn==1){
			gameBoard = gameBoard1;
			hitCount = hitCount1;
		}
		else{
			gameBoard = gameBoard2;
			hitCount = hitCount2;
		}
		var m = e.target.id.indexOf("*");
		var row = e.target.id.substring(3,m);
		var col = e.target.id.substring(m+1,e.target.id.length);

		//didn't hit anything
		if (gameBoard[row][col] == 0) {
			e.target.style.background = '#bbb';
			gameBoard[row][col] = 3;

			setTimeout(next_turn, 1500);

		//hit ship
		} else if (gameBoard[row][col] == 1) {
			e.target.style.background = 'black';
			gameBoard[row][col] = 2;
			
			hitCount++;
			
			//all ships has been hit
			if (hitCount == hit_to_win) {
				alert("All enemy battleships have been defeated! You win!");
			}
			else{
				setTimeout(next_turn, 1500);
			}
		//shot fired at position that has already been hit
		} else if (gameBoard[row][col] > 1) {
			alert("Stop wasting your torpedos! You already fired at this location.");
		}		
	}
	e.stopPropagation();
}
//switch turn for firing shot
function next_turn(){
	if(player_turn==1){
		gameBoard1 = gameBoard;
		hitCount1 = hitCount;
		player_turn=2;
		draw_board(2);
	}
	else{
		gameBoard2 = gameBoard;
		hitCount2 = hitCount;
		player_turn=1;
		draw_board(1);
	}
}
//switch turn for setting ships on own board
function set_next_board(){
	if(player_turn==1){
		ship_count=0;
		player_turn=2;
		set_board(2);
	}
	else{
		document.getElementById("gameboard").setAttribute("style","width:750px; height:750px;position:relative;margin:0 auto 2em auto;");
		document.getElementById("init_board").innerHTML = "";
		player_turn=1;

		//swap the gameboards so each player can guess the other gameboard
		gameBoard2 = gameBoard1;
		gameBoard1 = gameBoard;

		draw_board(1);
	}
}