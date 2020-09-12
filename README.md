# pacman-io
A web based multiplayer Pacman game based on Phaser.io. The game supports up to two players playing against each other simultaneously as the ghosts and the pacman. 

## Game Logic
The game rules are identical to its ancestor, the original Pacman game. The Pacman side needs to eat all the dots and use tricks to evade / counter the chase of the ghosts. The ghosts, however, will need to deplete Pacman's lives by touching it.

### Pacman
The Pacman player plays as the Pacman which is very much like the original Pacman game.

### Ghost
The ghost player can control one ghost and switch between ghosts while the rest of the ghosts will be controlled by pathfinding AI.

Thanks to [EasyStar.js](https://github.com/prettymuchbryce/easystarjs) for providing A* pathfinding API, [Socket.io](https://github.com/socketio/socket.io) for event-based communication system, and [Phaser.io](https://github.com/photonstorm/phaser) for providing the HTML5 game framework!
