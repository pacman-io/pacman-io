var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
        	default: 'arcade',
        	arcade: {
        		gravity: {y: 0},
        		debug: false
        	}
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        },
        init: function(){
            game.stage.disableVisibilityChange = true;
        }
    };

    var game = new Phaser.Game(config);
	


    function preload ()
    {
    	this.load.image('background', 'assets/images/map.png');
    	this.load.image('coltiles', 'assets/images/coltiles.png');
    	this.load.image('maze', 'assets/images/maze.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/map.json');
        this.load.spritesheet('sprites', 'assets/images/sprites.png', {frameWidth: 32, frameHeight: 32});

    }

    function create ()
    {
    	this.add.image(14*16, 18*16, 'background');
    	this.map = this.make.tilemap({key: 'map'});
    	const tileset = this.map.addTilesetImage('coltiles');
    	this.layer = this.map.createStaticLayer('MapLayer', tileset);
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
    }

    function update ()
    {
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
