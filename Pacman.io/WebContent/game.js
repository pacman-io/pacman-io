var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    init: function() {
        game.stage.disableVisibilityChange = true;
    }
};

var game = new Phaser.Game(config);


function preload() {
    this.load.image('background', 'assets/images/map.png');
    this.load.image('coltiles', 'assets/images/coltiles.png');
    this.load.image('maze', 'assets/images/maze.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/map.json');
    this.load.spritesheet('sprites', 'assets/images/sprites32.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('sprites2', 'assets/images/sprites.png', { frameWidth: 32, frameHeight: 32 });
}
 



function create() {
	
	
	
    this.PACMAN_VELOCITY = 80;
    this.GHOST_VELOCITY = 75;

    this.add.image(14 * 16, 18 * 16, 'background');
    this.map = this.make.tilemap({ key: 'map' });
    
    

    var dotSprites = this.map.createFromTiles(2, null, {key: 'sprites', frame: 100}, this, this.cameras.main, layer='DotLayer');
    this.physics.world.enable(dotSprites);
    for(var i=0; i<dotSprites.length; i++){
    	dotSprites[i].body.setSize(1, 1, true);
    }
    this.dots = this.physics.add.group(dotSprites);
    this.dots.incXY(8, 8); //Dot offset
    

    
    const tileset = this.map.addTilesetImage('coltiles');
    this.layer = this.map.createStaticLayer('MapLayer', tileset);
    this.map.setLayer('MapLayer');

    this.directions = new Array();

    spawnpoint = this.map.tileToWorldXY(13, 26);
    this.layer.setAlpha(0.5);
    this.layer.setCollisionByProperty({ collides: true });

    this.pacmanMap = {};
    this.ghostMap = {};
    Client.createNewPlayer();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.current_direction = Phaser.RIGHT;
    this.select_direction = Phaser.RIGHT;
    

    this.anims.create({
        key: 'pacman_move',
        frames: this.anims.generateFrameNumbers('sprites2', { start: 0, end: 2 }),
        frameRate: 15,
        repeat: -1,
        yoyo: true
    });

    this.anims.create({
        key: 'blinky_move_right',
        frames: this.anims.generateFrameNumbers('sprites', { start: 22, end: 23 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'blinky_move_left',
        frames: this.anims.generateFrameNumbers('sprites', { start: 24, end: 25 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'blinky_move_up',
        frames: this.anims.generateFrameNumbers('sprites', { start: 26, end: 27 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'blinky_move_down',
        frames: this.anims.generateFrameNumbers('sprites', { start: 28, end: 29 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'speedy_move_right',
        frames: this.anims.generateFrameNumbers('sprites', { start: 33, end: 34 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'speedy_move_left',
        frames: this.anims.generateFrameNumbers('sprites', { start: 35, end: 36 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'speedy_move_up',
        frames: this.anims.generateFrameNumbers('sprites', { start: 37, end: 38 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'speedy_move_down',
        frames: this.anims.generateFrameNumbers('sprites', { start: 39, end: 40 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'inky_move_right',
        frames: this.anims.generateFrameNumbers('sprites', { start: 44, end: 45 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'inky_move_left',
        frames: this.anims.generateFrameNumbers('sprites', { start: 46, end: 47 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'inky_move_up',
        frames: this.anims.generateFrameNumbers('sprites', { start: 48, end: 49 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'inky_move_down',
        frames: this.anims.generateFrameNumbers('sprites', { start: 50, end: 51 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'clyde_move_right',
        frames: this.anims.generateFrameNumbers('sprites', { start: 55, end: 56 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'clyde_move_left',
        frames: this.anims.generateFrameNumbers('sprites', { start: 57, end: 58 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'clyde_move_up',
        frames: this.anims.generateFrameNumbers('sprites', { start: 59, end: 60 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'clyde_move_down',
        frames: this.anims.generateFrameNumbers('sprites', { start: 61, end: 62 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'ghost_fear_blue',
        frames: this.anims.generateFrameNumbers('sprites', { start: 77, end: 78 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'ghost_fear_white',
        frames: this.anims.generateFrameNumbers('sprites', { start: 79, end: 80 }),
        frameRate: 15,
        repeat: -1,
    })
}

function update() {
    if (this.player) {
    	//RODDUR CHANGE
    	
        var x = this.player.x;
        var y = this.player.y;
        var angle = this.player.angle;
        if (this.player.oldPosition &&
            (x != this.player.oldPosition.x ||
                y != this.player.oldPosition.y ||
                angle != this.player.oldPosition.angle)) {
            Client.updatePlayer({
                x: x,
                y: y,
                angle: angle,
                id: this.player.id,
                type: this.player.type,
                animation: this.player.anims.getCurrentKey()
            });
        }

        this.player.oldPosition = {
            x: this.player.x,
            y: this.player.y,
            angle: this.player.angle
        };


        //Detect key input, turning point & turn (set current_position to select_direction)
        if(this.player.x > this.map.widthInPixels){
        	this.player.setPosition(1, this.player.y);
        }
        else if(this.player.x < 0){
        	this.player.setPosition(this.map.widthInPixels-1, this.player.y);
        }
        this.current_tile = this.map.getTileAtWorldXY(this.player.getCenter().x, this.player.getCenter().y, true);
        this.directions[Phaser.LEFT] = this.map.getTileAt(this.current_tile.x - 1, this.current_tile.y, true);
        this.directions[Phaser.RIGHT] = this.map.getTileAt(this.current_tile.x + 1, this.current_tile.y, true);
        this.directions[Phaser.UP] = this.map.getTileAt(this.current_tile.x, this.current_tile.y - 1, true);
        this.directions[Phaser.DOWN] = this.map.getTileAt(this.current_tile.x, this.current_tile.y + 1, true);

        if (this.cursors.left.isDown)
            this.select_direction = Phaser.LEFT;
        else if (this.cursors.right.isDown)
            this.select_direction = Phaser.RIGHT;
        else if (this.cursors.up.isDown)
            this.select_direction = Phaser.UP;
        else if (this.cursors.down.isDown)
            this.select_direction = Phaser.DOWN;

        if (this.current_tile.index == 5 &&
            this.select_direction != this.current_direction &&
            this.select_direction + this.current_direction != 11 &&
            this.select_direction + this.current_direction != 15 &&
            this.directions[this.select_direction] != null &&
            this.directions[this.select_direction].index != 1) {
            if (Phaser.Math.Fuzzy.Equal(this.player.x, this.current_tile.getCenterX(), 1) && Phaser.Math.Fuzzy.Equal(this.player.y, this.current_tile.getCenterY(), 1)) {
                this.current_direction = this.select_direction;
                this.player.setPosition(this.current_tile.getCenterX(), this.current_tile.getCenterY());
                this.player.body.reset(this.current_tile.getCenterX(), this.current_tile.getCenterY()); // Very Important! Reset all precalculated future positions to 0 to prevent update
            }
        }

        //Update velocity according to current_direction
        if (this.player.type == "pacman") {
            if (this.current_direction == Phaser.LEFT) {
                this.player.setVelocityY(0);
                this.player.setVelocityX(-this.PACMAN_VELOCITY);
                this.player.setAngle(180);
                this.player.anims.play('pacman_move', true);
            } else if (this.current_direction == Phaser.RIGHT) {
                this.player.setVelocityY(0);
                this.player.setVelocityX(this.PACMAN_VELOCITY);
                this.player.setAngle(0);
                this.player.anims.play('pacman_move', true);
            } else if (this.current_direction == Phaser.UP) {
                this.player.setVelocityX(0);
                this.player.setVelocityY(-this.PACMAN_VELOCITY);
                this.player.setAngle(270);
                this.player.anims.play('pacman_move', true);
            } else if (this.current_direction == Phaser.DOWN) {
                this.player.setVelocityX(0);
                this.player.setVelocityY(this.PACMAN_VELOCITY);
                this.player.setAngle(90);
                this.player.anims.play('pacman_move', true);
            }
        } else if (this.player.type == "ghost") {
            if (this.current_direction == Phaser.LEFT) {
                this.player.setVelocityY(0);
                this.player.setVelocityX(-this.GHOST_VELOCITY);
                this.player.anims.play('blinky_move_left', true);
            } else if (this.current_direction == Phaser.RIGHT) {
                this.player.setVelocityY(0);
                this.player.setVelocityX(this.GHOST_VELOCITY);
                this.player.anims.play('blinky_move_right', true);
            } else if (this.current_direction == Phaser.UP) {
                this.player.setVelocityX(0);
                this.player.setVelocityY(-this.GHOST_VELOCITY);
                this.player.anims.play('blinky_move_up', true);
            } else if (this.current_direction == Phaser.DOWN) {
                this.player.setVelocityX(0);
                this.player.setVelocityY(this.GHOST_VELOCITY);
                this.player.anims.play('blinky_move_down', true);
            }
            
        }
        this.physics.world.postUpdate();
    }

}

function eatDot(pacman, dot) {

    dot.destroy();
    Client.removeDot(dot);

    if (this.dots.total === 0) //win
    {
        //this.dots.callAll('revive');
        alert("you won!");
    }

}

game.addNewPlayer = function(x, y, id) {
	console.log(id);
	this.scene.scenes[0].playerMap[id] = this.scene.scenes[0].physics.add.sprite(x, y, 'sprites');
	this.scene.scenes[0].playerMap[id].body.setSize(16,16, true);
	this.scene.scenes[0].playerMap[id].anims.play('pacman_move', true);
	this.scene.scenes[0].physics.add.collider(this.scene.scenes[0].playerMap[id], this.scene.scenes[0].layer);
}

game.setCurrentPlayer = function(index) {
	this.scene.scenes[0].player = this.scene.scenes[0].playerMap[index];
	this.scene.scenes[0].player.id = index;
}

game.removePlayer = function(id) {
	this.scene.scenes[0].playerMap[id].destroy();
	delete this.scene.scenes[0].playerMap[id];
}

game.updatePlayer = function(otherPlayer) {
	this.scene.scenes[0].playerMap[otherPlayer.id].x = otherPlayer.x;
	this.scene.scenes[0].playerMap[otherPlayer.id].y = otherPlayer.y;
	this.scene.scenes[0].playerMap[otherPlayer.id].angle = otherPlayer.angle;
}

game.addNewPacman = function(x, y, id) {
    console.log(id);
    this.scene.scenes[0].pacmanMap[id] = this.scene.scenes[0].physics.add.sprite(x, y, 'sprites');
    this.scene.scenes[0].pacmanMap[id].body.setSize(16, 16, true);
    this.scene.scenes[0].pacmanMap[id].anims.play('pacman_move', true);
    this.scene.scenes[0].physics.add.collider(this.scene.scenes[0].pacmanMap[id], this.scene.scenes[0].layer);
}

game.addNewGhost = function(x, y, id) {
    console.log(id);
    this.scene.scenes[0].ghostMap[id] = this.scene.scenes[0].physics.add.sprite(x, y, 'sprites');
    this.scene.scenes[0].ghostMap[id].body.setSize(16, 16, true);
    this.scene.scenes[0].ghostMap[id].anims.play('blinky_move_right', true);
    this.scene.scenes[0].physics.add.collider(this.scene.scenes[0].ghostMap[id], this.scene.scenes[0].layer);
}

game.setCurrentPacman = function(index) {
    this.scene.scenes[0].player = this.scene.scenes[0].pacmanMap[index];
    this.scene.scenes[0].player.id = index;
    this.scene.scenes[0].player.type = "pacman";
    this.scene.scenes[0].physics.add.overlap(this.scene.scenes[0].player, this.scene.scenes[0].dots, eatDot, null, this.scene.scenes[0]);
}

game.setCurrentGhost = function(index) {
    this.scene.scenes[0].player = this.scene.scenes[0].ghostMap[index];
    this.scene.scenes[0].player.id = index;
    this.scene.scenes[0].player.type = "ghost";
}

game.removePacman = function(id) {
    this.scene.scenes[0].pacmanMap[id].destroy();
    delete this.scene.scenes[0].pacmanMap[id];
}

game.removeGhost = function(id) {
    this.scene.scenes[0].ghostMap[id].destroy();
    delete this.scene.scenes[0].ghostMap[id];
}

game.removeDot = function(coordinate) {
	for(var i=0; i<game.scene.scenes[0].dots.children.entries.length; i++){
		if(game.scene.scenes[0].dots.children.entries[i].x === coordinate.x && game.scene.scenes[0].dots.children.entries[i].y === coordinate.y){
			game.scene.scenes[0].dots.children.entries[i].destroy();
			return;
		}
	}
}

game.updatePacman = function(otherPlayer) {
    this.scene.scenes[0].pacmanMap[otherPlayer.id].x = otherPlayer.x;
    this.scene.scenes[0].pacmanMap[otherPlayer.id].y = otherPlayer.y;
    this.scene.scenes[0].pacmanMap[otherPlayer.id].angle = otherPlayer.angle;
}

game.updateGhost = function(otherPlayer) {
    this.scene.scenes[0].ghostMap[otherPlayer.id].x = otherPlayer.x;
    this.scene.scenes[0].ghostMap[otherPlayer.id].y = otherPlayer.y;
    this.scene.scenes[0].ghostMap[otherPlayer.id].anims.play(otherPlayer.animation, true);
}
