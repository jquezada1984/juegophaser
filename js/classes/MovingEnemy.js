import IEnemy from '../interfaces/IEnemy.js';

export default class MovingEnemy extends IEnemy {
    constructor(scene, x, y, texture, speed) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = speed;

        this.initAnimations(scene);
    }

    initAnimations(scene) {
        scene.anims.create({
            key: 'move',
            frames: scene.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.play('move');
    }

    move() {
        if (this.body.blocked.left) {
            this.speed = Math.abs(this.speed);
        } else if (this.body.blocked.right) {
            this.speed = -Math.abs(this.speed);
        }
        this.setVelocityX(this.speed);
    }

    attack(player) {
        // Implementar lógica de ataque aquí
    }
}