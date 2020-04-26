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
var pathFinder;


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
    const tileset = this.map.addTilesetImage('coltiles');
    this.layer = this.map.createStaticLayer('MapLayer', tileset);
    this.map.setLayer('MapLayer');
    this.layer.setAlpha(0.5);
    this.layer.setCollisionByProperty({ collides: true });
    
    this.pathFinder = new EasyStar.js(); //Initialize EasyStar pathFinder
    var mapGrid = [];
    for(var y=0; y < this.map.height; y++){
    	var col = [];
    	for(var x=0; x < this.map.width; x++){
    		var tile = this.map.getTileAt(x, y, true);
    		if(tile == null)
    			col.push(0);
    		else
    			col.push(tile.index);
    	}
    	mapGrid.push(col);
    }
    
    this.pathFinder.setGrid(mapGrid);
    this.pathFinder.setAcceptableTiles([-1, 2, 3, 4, 5, 6]);

    var dotSprites = this.map.createFromTiles(2, null, {key: 'sprites', frame: 100}, this, this.cameras.main, layer='DotLayer');
    this.physics.world.enable(dotSprites);
    for(var i=0; i<dotSprites.length; i++){
    	dotSprites[i].body.setSize(1, 1, true);
    }
    this.dots = this.physics.add.group(dotSprites);
    this.dots.incXY(8, 8); //Dot offset
    
    this.directions = new Array();

    

    this.pacmanMap = {};
    this.ghostMap = {};
    Client.createNewPlayer();

    this.cursors = this.input.keyboard.createCursorKeys();
    
    

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
	if(this.player){
		this.player.detectKeyboardInput();
		this.player.update();
	    if(this.player.type === 'ghost'){
	    	for(let i in this.ghostMap){
	    		if(this.ghostMap[i] != this.player){
	    			this.ghostMap[i].calculatePath();
	    			this.ghostMap[i].update();
	    		}
	    	}
	    }
	}
    

}

function detectKeyboardInput() {
	if (this.scene.cursors.left.isDown)
        this.select_direction = Phaser.LEFT;
    else if (this.scene.cursors.right.isDown)
        this.select_direction = Phaser.RIGHT;
    else if (this.scene.cursors.up.isDown)
        this.select_direction = Phaser.UP;
    else if (this.scene.cursors.down.isDown)
        this.select_direction = Phaser.DOWN;
}

function calculatePath() {
	var current_tile = this.scene.map.getTileAtWorldXY(this.getCenter().x, this.getCenter().y, true);
	var destination_tile;
	var that = this;
	
	//Gonna change if multiple pacmans are there
	for(let index in this.scene.pacmanMap){
		destination_tile = this.scene.map.getTileAtWorldXY(this.scene.pacmanMap[index].getCenter().x, this.scene.pacmanMap[index].getCenter().y, true);
	}
	
	 
	this.scene.pathFinder.findPath(current_tile.x, current_tile.y, destination_tile.x, destination_tile.y, function(path){
		
		if(path === null || path.length === 1){
			//Failsafe: pick a random direction for now
			
			
		}
		else{
			console.log(that.current_direction);
			if(path[1].x === current_tile.x){
				if(path[1].y > current_tile.y)
					that.select_direction = Phaser.DOWN;
				else if(path[1].y < current_tile.y)
					that.select_direction = Phaser.UP;
			}
			if(path[1].y === current_tile.y){
				if(path[1].x > current_tile.x)
					that.select_direction = Phaser.RIGHT;
				else if(path[1].x < current_tile.x)
					that.select_direction = Phaser.LEFT;
			}
			if(that.select_direction + that.current_direction == 11 ||
					that.select_direction + that.current_direction == 15){
				that.select_direction += 1;
				if(that.select_direction > 8)
					that.select_direction = 5;
			}
			
		}
	})
	this.scene.pathFinder.calculate();
}

function entityUpdate() {
		
        var x = this.x;
        var y = this.y;
        var angle = this.angle;
        if (this.oldPosition &&
            (x != this.oldPosition.x ||
                y != this.oldPosition.y ||
                angle != this.oldPosition.angle)) {
            Client.updatePlayer({
                x: x,
                y: y,
                angle: angle,
                id: this.id,
                type: this.type,
                animation: this.anims.getCurrentKey()
            });
        }

        this.oldPosition = {
            x: this.x,
            y: this.y,
            angle: this.angle
        };


        //Detect key input, turning point & turn (set current_position to select_direction)
        if(this.x > this.scene.map.widthInPixels){
        	this.setPosition(1, this.y);
        }
        else if(this.x < 0){
        	this.setPosition(this.scene.map.widthInPixels-1, this.y);
        }
        
        this.current_tile = this.scene.map.getTileAtWorldXY(this.getCenter().x, this.getCenter().y, true);
        this.directions[Phaser.LEFT] = this.scene.map.getTileAt(this.current_tile.x - 1, this.current_tile.y, true);
        this.directions[Phaser.RIGHT] = this.scene.map.getTileAt(this.current_tile.x + 1, this.current_tile.y, true);
        this.directions[Phaser.UP] = this.scene.map.getTileAt(this.current_tile.x, this.current_tile.y - 1, true);
        this.directions[Phaser.DOWN] = this.scene.map.getTileAt(this.current_tile.x, this.current_tile.y + 1, true);

        

        //Update velocity according to current_direction
        if (this.type == "pacman") {
        	if (this.current_tile.index == 5 &&
                    this.select_direction != this.current_direction &&
                    this.select_direction + this.current_direction != 11 &&
                    this.select_direction + this.current_direction != 15 &&
                    this.directions[this.select_direction] != null &&
                    this.directions[this.select_direction].index != 1) {
                    if (Phaser.Math.Fuzzy.Equal(this.x, this.current_tile.getCenterX(), 1) && Phaser.Math.Fuzzy.Equal(this.y, this.current_tile.getCenterY(), 1)) {
                        this.current_direction = this.select_direction;
                        this.setPosition(this.current_tile.getCenterX(), this.current_tile.getCenterY());
                        this.body.reset(this.current_tile.getCenterX(), this.current_tile.getCenterY()); // Very Important! Reset all precalculated future positions to 0 to prevent update
                    }
                }
            if (this.current_direction == Phaser.LEFT) {
                this.setVelocityY(0);
                this.setVelocityX(-this.scene.PACMAN_VELOCITY);
                this.setAngle(180);
                this.anims.play('pacman_move', true);
            } else if (this.current_direction == Phaser.RIGHT) {
                this.setVelocityY(0);
                this.setVelocityX(this.scene.PACMAN_VELOCITY);
                this.setAngle(0);
                this.anims.play('pacman_move', true);
            } else if (this.current_direction == Phaser.UP) {
                this.setVelocityX(0);
                this.setVelocityY(-this.scene.PACMAN_VELOCITY);
                this.setAngle(270);
                this.anims.play('pacman_move', true);
            } else if (this.current_direction == Phaser.DOWN) {
                this.setVelocityX(0);
                this.setVelocityY(this.scene.PACMAN_VELOCITY);
                this.setAngle(90);
                this.anims.play('pacman_move', true);
            }
        } else if (this.type == "ghost") {
        	if ((this.current_tile.index == 5 || this.current_tile.index == 6) &&
                    this.select_direction != this.current_direction &&
                    this.select_direction + this.current_direction != 11 &&
                    this.select_direction + this.current_direction != 15 &&
                    this.directions[this.select_direction] != null &&
                    this.directions[this.select_direction].index != 1) {
                    if (Phaser.Math.Fuzzy.Equal(this.x, this.current_tile.getCenterX(), 1) && Phaser.Math.Fuzzy.Equal(this.y, this.current_tile.getCenterY(), 1)) {
                        this.current_direction = this.select_direction;
                        this.setPosition(this.current_tile.getCenterX(), this.current_tile.getCenterY());
                        this.body.reset(this.current_tile.getCenterX(), this.current_tile.getCenterY()); // Very Important! Reset all precalculated future positions to 0 to prevent update
                    }
                }
            if (this.current_direction == Phaser.LEFT) {
                this.setVelocityY(0);
                this.setVelocityX(-this.scene.GHOST_VELOCITY);
                this.anims.play(this.ghostType+'_move_left', true);
            } else if (this.current_direction == Phaser.RIGHT) {
                this.setVelocityY(0);
                this.setVelocityX(this.scene.GHOST_VELOCITY);
                this.anims.play(this.ghostType+'_move_right', true);
            } else if (this.current_direction == Phaser.UP) {
                this.setVelocityX(0);
                this.setVelocityY(-this.scene.GHOST_VELOCITY);
                this.anims.play(this.ghostType+'_move_up', true);
            } else if (this.current_direction == Phaser.DOWN) {
                this.setVelocityX(0);
                this.setVelocityY(this.scene.GHOST_VELOCITY);
                this.anims.play(this.ghostType+'_move_down', true);
            }
            
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


game.addNewPacman = function(x, y, id) {
    console.log(id);
    this.scene.scenes[0].pacmanMap[id] = this.scene.scenes[0].physics.add.sprite(x, y, 'sprites');
    this.scene.scenes[0].pacmanMap[id].type = 'pacman';
    this.scene.scenes[0].pacmanMap[id].body.setSize(16, 16, true);
    this.scene.scenes[0].pacmanMap[id].anims.play('pacman_move', true);
    this.scene.scenes[0].physics.add.collider(this.scene.scenes[0].pacmanMap[id], this.scene.scenes[0].layer);
    this.scene.scenes[0].pacmanMap[id].current_direction = Phaser.RIGHT;
    this.scene.scenes[0].pacmanMap[id].select_direction = Phaser.RIGHT;
    this.scene.scenes[0].pacmanMap[id].update = entityUpdate;
    this.scene.scenes[0].pacmanMap[id].processInput = detectKeyboardInput;
    this.scene.scenes[0].pacmanMap[id].detectKeyboardInput = detectKeyboardInput;
    this.scene.scenes[0].pacmanMap[id].directions = {};
}

game.addNewGhost = function(x, y, id, ghostType) {
    console.log(id);
    this.scene.scenes[0].ghostMap[id] = this.scene.scenes[0].physics.add.sprite(x, y, 'sprites');
    this.scene.scenes[0].ghostMap[id].type = 'ghost';
    this.scene.scenes[0].ghostMap[id].ghostType = ghostType;
    this.scene.scenes[0].ghostMap[id].body.setSize(16, 16, true);
    this.scene.scenes[0].ghostMap[id].anims.play(ghostType+'_move_right', true);
    this.scene.scenes[0].physics.add.collider(this.scene.scenes[0].ghostMap[id], this.scene.scenes[0].layer);
    this.scene.scenes[0].ghostMap[id].current_direction = Phaser.UP;
    this.scene.scenes[0].ghostMap[id].select_direction = Phaser.UP;
    this.scene.scenes[0].ghostMap[id].update = entityUpdate;
    this.scene.scenes[0].ghostMap[id].processInput = detectKeyboardInput;
    this.scene.scenes[0].ghostMap[id].calculatePath = calculatePath;
    this.scene.scenes[0].ghostMap[id].detectKeyboardInput = detectKeyboardInput;
    this.scene.scenes[0].ghostMap[id].directions = {};
}

game.setCurrentPacman = function(index) {
    this.scene.scenes[0].player = this.scene.scenes[0].pacmanMap[index];
    this.scene.scenes[0].player.id = index;
    this.scene.scenes[0].physics.add.overlap(this.scene.scenes[0].player, this.scene.scenes[0].dots, eatDot, null, this.scene.scenes[0]);
}

game.setCurrentGhost = function(index) {
    this.scene.scenes[0].player = this.scene.scenes[0].ghostMap[index];
    this.scene.scenes[0].player.id = index;
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
