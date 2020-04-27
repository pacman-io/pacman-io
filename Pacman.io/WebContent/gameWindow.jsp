<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	
	<% String port = (String)request.getParameter("portNum"); %>
	<title><%=port%></title>
 	<script src="//cdn.jsdelivr.net/npm/phaser@3.22.0/dist/phaser.js"></script>
    <script src="js/easystar-0.4.3.js"></script>
    <script src = "https://cdn.jsdelivr.net/npm/socket.io-client@2/dist/socket.io.js"></script>
</head>
<body>
	  <script src = "game.js"></script>
	  <script> //client code
	  
		  var Client = {};
	      Client.socket = io('http://localhost:' + <%=port%>);
	
	      Client.createNewPlayer = function() {
	    	    Client.socket.emit('newplayer', { message: 'newplayer' });
	    	}

	    	Client.updatePlayer = function(data) {
	    	    Client.socket.emit('playermovemnet', data);
	    	}

	    	Client.removeDot = function(dot) {
	    		Client.socket.emit('removedot', {x: dot.x, y: dot.y});
	    	}

	    	Client.killPacman = function(id) {
	    		Client.socket.emit("killpacman", {id: id});
	    	}

	    	Client.socket.on('newpacman', function(player) {
	    	    game.addNewPacman(player.x, player.y, player.id);
	    	})

	    	Client.socket.on('newghost',
	    	    function(player) {
	    	        game.addNewGhost(player.x, player.y, player.id, player.type);
	    	    })


	    	//allpacman or allghost is only called once upon initialization.
	    	Client.socket.on('allpacmans', function(data, isPacman) {
	    	    for (var i = 0; i < data.length; i++) {
	    	        game.addNewPacman(data[i].x, data[i].y, data[i].id);
	    	    }
	    	    //something
	    	    if (data.length > 0 && isPacman)
	    	        game.setCurrentPacman(data[data.length - 1].id);
	    	})

	    	Client.socket.on('allghosts', function(data, isGhost) {
	    	    for (var i = 0; i < data.length; i++) {
	    	        game.addNewGhost(data[i].x, data[i].y, data[i].id, data[i].type, data[i].state);
	    	    }
	    	    if (data.length > 0 && isGhost){
	    	    	game.setCurrentGhost(data[0].id);
	    	    	
	    	    }
	    	})

	    	Client.socket.on('updateghoststate', function(ghosts) {
	    		for(var i = 0; i < ghosts.length; i++){
	    			game.setGhostState(ghosts[i].id, ghosts[i].state);
	    		}
	    	})

	    	Client.socket.on('remove', function(id, type) {
	    	    if (type == "pacman")
	    	        game.removePacman(id);
	    	    else if (type == "ghost")
	    	        game.removeGhost(id);
	    	})

	    	Client.socket.on('removealldots', function(coordinates){
	    		for(let c in coordinates){
	    			game.removeDot(coordinates[c]);
	    		}
	    	})

	    	Client.socket.on('removedot', function(coordinate) {
	    		game.removeDot(coordinate);
	    	})

	    	Client.socket.on('playermovemnet', function(player, type) {
	    	    if (type == "pacman")
	    	        game.updatePacman(player);
	    	    else if (type == "ghost")
	    	        game.updateGhost(player);
	    	})

	    	Client.socket.on('killpacman', function(id) {
	    		game.updateKillPacman(id);
	    	})
	  
	  
	  </script>
</body>
</html>