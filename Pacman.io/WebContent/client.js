var Client = {};
Client.socket = io('http://localhost:9092');

Client.createNewPlayer = function() {
	Client.socket.emit('newplayer', {message: 'newplayer'});
}

Client.updatePlayer = function(data) {
	Client.socket.emit('playermovemnet', data);
}

Client.socket.on('newplayer', function(player) {
	game.addNewPlayer(player.x, player.y, player.id);
})

Client.socket.on('allplayers', function(data) {
	for(var i = 0; i < data.length; i++){
        game.addNewPlayer(data[i].x, data[i].y, data[i].id);
    }
	game.setCurrentPlayer(data[data.length-1].id);
})

Client.socket.on('remove', function(id) {
	game.removePlayer(id);
})

Client.socket.on('playermovemnet', function(player) {
	game.updatePlayer(player);
})