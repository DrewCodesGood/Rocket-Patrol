// create game config obj
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
};
// create main game obj
let game = new Phaser.Game(config);

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000    
}

//reserve some keyboard bindings
let keyF, keyLEFT, keyRIGHT, keySPACE;
