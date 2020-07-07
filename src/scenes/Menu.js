class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.mp3');
        this.load.audio('buzz', './assets/buzz.mp3');
        this.load.audio('buzz2', './assets/buzz2.mp3');
        this.load.audio('buzz3', './assets/buzz3.mp3');
        this.load.audio('buzz4', './assets/buzz4.mp3');
        this.load.audio('shoot', './assets/shoot.mp3');
        this.load.audio('GameSong' , './assets/GameSong.mp3');
        this.load.image('backgroundtitle', './assets/backgroundtitle.png');
    }


    create() {
        //menu display
        let menuConfig = {
            fontFamily: 'Verdana',
            fontSize: '28px',
            backgroundColor: '#CCCCFF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 3,
                bottom: 3,
            },
            fixedWidth: 0
        }

        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.image(centerX,centerY, 'backgroundtitle');
        this.add.text(centerX, centerY- textSpacer, 'Flight of the Bumblebees', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Use <-> arrows to move & (F) to pollenate!', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#87CEEB';
        menuConfig.color = '#000000';
        this.add.text(centerX, centerY + textSpacer, 'Press <- for Slow Bees or -> for Fast Bees', menuConfig).setOrigin(0.5);

        //change scenes
        //this.scene.start("playScene");

            // define keys
            keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
            keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
            keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 2,
            gameTimer: 60000
          
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene"); 
          
        
          
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    

            
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    

          

        }
      }

      
}