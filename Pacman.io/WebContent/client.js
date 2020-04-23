var Client = {};
Client.socket = io('http://localhost:9092');

Client.createNewPlayer = function() {
    Client.socket.emit('newplayer', { message: 'newplayer' });
}

Client.updatePlayer = function(data) {
    Client.socket.emit('playermovemnet', data);
}

Client.socket.on('newpacman', function(player) {
    game.addNewPacman(player.x, player.y, player.id);
})

Client.socket.on('newghost'),
    function(player) {
        game.addNewGhost(player.x, player.y, player.id);
    }


//allpacman or allghost is only called once upon initialization.
Client.socket.on('allpacmans', function(data) {
    for (var i = 0; i < data.length; i++) {
        game.addNewPacman(data[i].x, data[i].y, data[i].id);
    }
    //something
    if (data.length > 0)
        game.setCurrentPacman(data[data.length - 1].id);
})

Client.socket.on('allghosts', function(data) {
    for (var i = 0; i < data.length; i++) {
        game.addNewGhost(data[i].x, data[i].y, data[i].id);
    }
    if (data.length > 0){
    	game.setCurrentGhost(data[data.length - 1].id);
    }
        
})

Client.socket.on('remove', function(id) {
    game.removePlayer(id);
})

Client.socket.on('playermovemnet', function(player) {
    game.updatePlayer(player);
})