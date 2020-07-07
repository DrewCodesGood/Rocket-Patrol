class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        //this.load.image('bee', './assets/bee.png');
        //this.load.image('bee2', './assets/bee2.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('love', './assets/love.png', {frameWidth: 55, frameHeight: 29, startFrame: 0, endFrame: 9});
        this.load.spritesheet('bee', './assets/spritesheet.png', {frameWidth: 64, frameHeight: 32, startFrame:0, endFrame: 1});
        
    }

    create() {

        //BGM loop
        this.song = this.sound.add('GameSong' , {volume: 0.5});
        this.song.play();
        
        //place tile sprite bg
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);


        //borders
        this.add.rectangle(15, 446, 630, 32, 0x567d46).setOrigin(0,0);
        this.add.rectangle(115, 75, 5, 630, 0x567d46).setOrigin(0,0);
        //UI background
        this.add.circle(78, 55, 40, 40, 0xFFFF00).setOrigin(0,0);

        //add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket', 0).setScale(0.5, 0.5).setOrigin(0,0);


        // add spaceships (p1)
        this.ship01 = new Spaceship(this, game.config.width + 300, 260, 'bee', 0, 40).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'bee', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'bee', 0, 10).setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width + 192, 132, 'bee', 0, 30).setOrigin(0,0).setScale(.5);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // animation config
        this.anims.create({
        key: 'happy',
        frames: this.anims.generateFrameNumbers('love', { start: 0, end: 9, first: 0}),
        frameRate: 30

        
        
});
        // score
        this.p1Score = 0;
         // score display
         let scoreConfig = {
            fontFamily: 'Verdana',
            fontSize: '30px',
            backgroundColor: '#FFFF00',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);  
        this.timeRight = this.add.text(490, 450, this.timeCounter, this.timeConfig);


          
        
        // game over flag
        this.gameOver = false;
        // 60-second play clock


        
        scoreConfig.fixedWidth = 0;
        this.timeCounter = game.settings.gameTimer/1000;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'TIMES UP', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            },
        null, this);
        this.time.addEvent(
            {
                loop: true, callback: this.countTime
                ,callbackScope: this
                ,delay: 1000
        
            }
        );


  // time display
  let timeConfig = {
    fontFamily: 'Verdana',
    fontSize: '28px',
    backgroundColor: '#ADD8E6',
    color: '#9999FF',
    align: 'right',
    padding: {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 100
}


    }
    
    update() {

          // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
        this.scene.restart(this.p1Score);

        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        // scroll bg/tile sprite
        this.starfield.tilePositionX -= 3;

        //update time
        //this.timeRight.text = this.timeCounter;

        // update rocket
        this.p1Rocket.update();

        this.ship01.update();
        this.ship02.update();
        this.ship03.update();
        this.ship04.update();

        //console.log('ship01s frame %d', this.ship01.frame);

        if (!this.gameOver) {  
            // update rocket             
            this.p1Rocket.update();         
            // update spaceships
            this.ship01.update();           
            this.ship02.update();
            this.ship03.update();
            this.ship03.update();
        
        
        } 
        
        if (this.gameOver != true) {
            this.song.setLoop(true);
        }
        else {
            this.song.setLoop(false);
        }

        //check collision
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
    }
        checkCollision(rocket, ship) {
            //simple AABB checking
            if(rocket.x < ship.x + ship.width && 
                rocket.x + rocket.width > ship.x &&
                rocket.y < ship.y + ship.height &&
                rocket.height + rocket.y > ship.y){
                    return true;
            } else {
                return false;
            }
        }
        shipExplode(ship) {                         

            // create explosion sprite at ship's position
            ship.setFrame(1);
            // console.log('sprite changed');
            let boom = this.add.sprite(ship.x, ship.y, 'love').setOrigin(0, 0);
            boom.anims.play('happy');             
            // play explode animation
            boom.on('animationcomplete', () => {    
                this.add.sprite
                boom.destroy();                     
                // remove explosion sprite
            });       
            // score increment and repaint
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
            //boom

            this.choose_buzz = Phaser.Math.Between(0,3);
            switch(this.choose_buzz){
                case 0: this.sound.play('buzz'), {volume: 0.5};
                break;
                case 1: this.sound.play('buzz2'), {volume: 0.5};
                break;
                case 2: this.sound.play('buzz3'), {volume: 0.5};
                break;
                case 3: this.sound.play('buzz4'), {volume: 0.5};
                break;

                default: break;
            }

        }
            countTime()
            {
                
                this.timeCounter--;
                this.timeRight.text = this.timeCounter;
            }
            
}