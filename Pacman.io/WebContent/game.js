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
    this.load.spritesheet('sprites', 'assets/images/sprites.png', { frameWidth: 32, frameHeight: 32 });
}
    function create ()
    {
    	this.add.image(14*16, 18*16, 'background');
    	this.map = this.make.tilemap({key: 'map'}); 
    	const tileset = this.map.addTilesetImage('coltiles');
    	//tile Indexes: 2 for small dot, 3 for big dot
    	
    	this.layer = this.map.createStaticLayer('MapLayer', tileset);
    	
    	
    	this.dots = this.add.physicsGroup();

    	this.map.createFromTiles(2, null /*this.safetile*/, 'dot', this.layer, this.dots);
    	
    	
    	this.map.setLayer('MapLayer');
    	
    	
    	this.directions = new Array();

    	spawnpoint = this.map.tileToWorldXY(13, 26);
    	this.layer.setAlpha(0.5);
    	this.layer.setCollisionByProperty({collides: true});
    	
    	Client.createNewPlayer();
    	
    	this.playerMap = {};

    	
    	this.cursors = this.input.keyboard.createCursorKeys();
    	this.current_direction = Phaser.RIGHT;
    	this.select_direction = Phaser.RIGHT;

    	this.anims.create({
            key: 'pacman_move',
            frames: this.anims.generateFrameNumbers('sprites', { start: 0, end: 2 }),
            frameRate: 15,
            repeat: -1,
            yoyo: true
        });
    };
    eatDot = function (pacman, dot) {

        dot.kill();

        if (this.dots.total === 0) //win
        {
            //this.dots.callAll('revive');
            alert("you won!");
        }

    }
    function update ()
    {
    	this.physics.arcade.overlap(this.player, this.dots, this.eatDot, null, this);
    	
    	if(this.player)
    	{
    		var x = this.player.x;
        	var y = this.player.y;
        	var angle = this.player.angle;
        	if(this.player.oldPosition && 
        		(x != this.player.oldPosition.x ||
        		y != this.player.oldPosition.y ||
        		angle != this.player.oldPosition.angle))
        		{
        		Client.updatePlayer({x:x, y:y, angle:angle, id:this.player.id});
        		}
        	
        	this.player.oldPosition = {
        			x: this.player.x,
        			y: this.player.y,
        			angle: this.player.angle
        	};
        	
        	this.current_tile = this.map.getTileAtWorldXY(this.player.getCenter().x, this.player.getCenter().y, true);
        	this.directions[Phaser.LEFT] = this.map.getTileAt(this.current_tile.x-1, this.current_tile.y, true);
        	this.directions[Phaser.RIGHT] = this.map.getTileAt(this.current_tile.x+1, this.current_tile.y, true);
        	this.directions[Phaser.UP] = this.map.getTileAt(this.current_tile.x, this.current_tile.y-1, true);
        	this.directions[Phaser.DOWN] = this.map.getTileAt(this.current_tile.x, this.current_tile.y+1, true);
        	
    		if(this.cursors.left.isDown)
    			this.select_direction = Phaser.LEFT;
    		else if(this.cursors.right.isDown)
    			this.select_direction = Phaser.RIGHT;
    		else if(this.cursors.up.isDown)
    			this.select_direction = Phaser.UP;
    		else if(this.cursors.down.isDown)
    			this.select_direction = Phaser.DOWN;

    		if(this.current_tile.index == 5 
    				&& this.select_direction != this.current_direction 
    				&& this.select_direction + this.current_direction != 11
    				&& this.select_direction + this.current_direction != 15
    				&& this.directions[this.select_direction] != null 
    				&& this.directions[this.select_direction].index != 1)
    		{
    			if(Phaser.Math.Fuzzy.Equal(this.player.x, this.current_tile.getCenterX(), 1) && Phaser.Math.Fuzzy.Equal(this.player.y, this.current_tile.getCenterY(), 1))
    			{
    				this.current_direction = this.select_direction;
    				this.player.setPosition(this.current_tile.getCenterX(), this.current_tile.getCenterY());
    			}
    		}
    		
    		if(this.current_direction == Phaser.LEFT)
    		{
    			this.player.setVelocityY(0);
    			this.player.setVelocityX(-80);
    			this.player.setAngle(180);
    			this.player.anims.play('pacman_move', true);
    		}
    		else if(this.current_direction == Phaser.RIGHT)
    		{
    			this.player.setVelocityY(0);
    			this.player.setVelocityX(80);
    			this.player.setAngle(0);
    			this.player.anims.play('pacman_move', true);
    		}
    		else if(this.current_direction == Phaser.UP)
    		{
    			this.player.setVelocityX(0);
    			this.player.setVelocityY(-80);
    			this.player.setAngle(270);
    			this.player.anims.play('pacman_move', true);
    		}
    		else if(this.current_direction == Phaser.DOWN)
    		{
    			this.player.setVelocityX(0);
    			this.player.setVelocityY(80);
    			this.player.setAngle(90);
    			this.player.anims.play('pacman_move', true);
    		}
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

function create() {
    this.PACMAN_VELOCITY = 80;
    this.GHOST_VELOCITY = 75;

    this.add.image(14 * 16, 18 * 16, 'background');
    this.map = this.make.tilemap({ key: 'map' });
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
        frames: this.anims.generateFrameNumbers('sprites', { start: 0, end: 2 }),
        frameRate: 15,
        repeat: -1,
        yoyo: true
    });

    this.anims.create({
        key: 'blinky_move_right',
        frames: this.anims.generateFrameNumbers('sprites', { start: 56, end: 57 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'blinky_move_left',
        frames: this.anims.generateFrameNumbers('sprites', { start: 58, end: 59 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'blinky_move_up',
        frames: this.anims.generateFrameNumbers('sprites', { start: 60, end: 61 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'blinky_move_down',
        frames: this.anims.generateFrameNumbers('sprites', { start: 62, end: 63 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'speedy_move_right',
        frames: this.anims.generateFrameNumbers('sprites', { start: 70, end: 71 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'speedy_move_left',
        frames: this.anims.generateFrameNumbers('sprites', { start: 72, end: 73 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'speedy_move_up',
        frames: this.anims.generateFrameNumbers('sprites', { start: 74, end: 75 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'speedy_move_down',
        frames: this.anims.generateFrameNumbers('sprites', { start: 76, end: 77 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'inky_move_right',
        frames: this.anims.generateFrameNumbers('sprites', { start: 84, end: 85 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'inky_move_left',
        frames: this.anims.generateFrameNumbers('sprites', { start: 86, end: 87 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'inky_move_up',
        frames: this.anims.generateFrameNumbers('sprites', { start: 88, end: 89 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'inky_move_down',
        frames: this.anims.generateFrameNumbers('sprites', { start: 90, end: 91 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'clyde_move_right',
        frames: this.anims.generateFrameNumbers('sprites', { start: 98, end: 99 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'clyde_move_left',
        frames: this.anims.generateFrameNumbers('sprites', { start: 100, end: 101 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'clyde_move_up',
        frames: this.anims.generateFrameNumbers('sprites', { start: 102, end: 103 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'clyde_move_down',
        frames: this.anims.generateFrameNumbers('sprites', { start: 104, end: 105 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'ghost_fear_blue',
        frames: this.anims.generateFrameNumbers('sprites', { start: 64, end: 65 }),
        frameRate: 15,
        repeat: -1,
    })

    this.anims.create({
        key: 'ghost_fear_white',
        frames: this.anims.generateFrameNumbers('sprites', { start: 66, end: 67 }),
        frameRate: 15,
        repeat: -1,
    })
}

function update() {
    if (this.player) {
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
    }

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
