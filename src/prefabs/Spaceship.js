
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
            this.x -= 3;
            // wraparound from left -> right
            if(this.x <= 0 - this.width) {
                this.x = game.config.width;
            }
        }

        reset() {
            this.x = game.config.width;
        }
    }
