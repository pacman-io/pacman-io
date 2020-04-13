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
    	this.layer = this.map.createStaticLayer(1, tileset);
    	this.map.setLayer(1);
    	this.layer.setAlpha(0.5);
    	this.directions = new Array();

    	spawnpoint = this.map.tileToWorldXY(13, 26);
    	this.layer.setCollisionByProperty({collides: true});

    	this.player = this.physics.add.sprite(spawnpoint.x+8, spawnpoint.y+8, 'sprites');
    	this.player.body.setSize(16,16, true);
    	this.physics.add.collider(this.player, this.layer);
    	this.cursors = this.input.keyboard.createCursorKeys();
    	this.current_direction = Phaser.RIGHT;


    }

    function update ()
    {
    	this.current_tile = this.map.getTileAtWorldXY(this.player.getCenter().x, this.player.getCenter().y, true);
    	this.directions[Phaser.LEFT] = this.map.getTileAt(this.current_tile.x-1, this.current_tile.y, true);
    	this.directions[Phaser.RIGHT] = this.map.getTileAt(this.current_tile.x+1, this.current_tile.y, true);
    	this.directions[Phaser.UP] = this.map.getTileAt(this.current_tile.x, this.current_tile.y-1, true);
    	this.directions[Phaser.DOWN] = this.map.getTileAt(this.current_tile.x, this.current_tile.y-1, true);
		
		var select_direction = this.current_direction;
		if(this.cursors.left.isDown)
			select_direction = Phaser.LEFT;
		else if(this.cursors.right.isDown)
			select_direction = Phaser.RIGHT;
		else if(this.cursors.up.isDown)
			select_direction = Phaser.UP;
		else if(this.cursors.down.isDown)
			select_direction = Phaser.DOWN;

		if(this.current_tile.index == 5 && select_direction != this.current_direction && this.directions[select_direction] != null && this.directions[select_direction].index != 1)
		{
			if(Phaser.Math.Fuzzy.Equal(this.player.x, this.current_tile.getCenterX(), 15) && Phaser.Math.Fuzzy.Equal(this.player.y, this.current_tile.getCenterY(), 15))
			{
				this.current_direction = select_direction;
				this.player.setPosition(this.current_tile.getCenterX(), this.current_tile.getCenterY());
			}
		}
			

		if(this.current_direction == Phaser.LEFT)
		{
			this.player.setVelocityY(0);
			this.player.setVelocityX(-32);
		}
		else if(this.current_direction == Phaser.RIGHT)
		{
			this.player.setVelocityY(0);
			this.player.setVelocityX(32);
		}
		else if(this.current_direction == Phaser.UP)
		{
			this.player.setVelocityX(0);
			this.player.setVelocityY(-32);
		}
		else if(this.current_direction == Phaser.DOWN)
		{
			this.player.setVelocityX(0);
			this.player.setVelocityY(32);
		}

    }
