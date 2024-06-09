export default class IEnemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
    }

    move() {
        throw new Error('Se debe implementar el método move().');
    }

    attack() {
        throw new Error('Se debe implementar el método attack().');
    }
}