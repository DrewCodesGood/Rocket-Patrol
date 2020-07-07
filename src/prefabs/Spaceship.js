
class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);

        // add obj to existing scene
        scene.add.existing(this);

        // store pointValue
        this.points = pointValue;
        
        

    }

    update() {
        
            // move spaceship left
                this.x -= game.settings.spaceshipSpeed -1;
              
            // wraparound from left -> right
            
            if(this.x <= 0 - this.width) {
                //console.log('bee moved back to start');
                this.setFrame(0);
                this.x = game.config.width;
            }
        }

        reset() {   
            this.x = game.config.width;
        }
    }
