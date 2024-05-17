import IEnemy from '../interfaces/IEnemy.js';

export default class Xenomorph extends IEnemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'xenomorph');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = 200;
        this.jumpHeight = -500;
        this.health = 50;
        this.initAnimations(scene);
    }

    initAnimations(scene) {
        scene.anims.create({
            key: 'xenomorphMove',
            frames: scene.anims.generateFrameNumbers('xenomorph', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.play('xenomorphMove');
    }

    move() {
        if (this.body.blocked.left) {
            this.speed = Math.abs(this.speed);
            this.flipX = false;
        } else if (this.body.blocked.right) {
            this.speed = -Math.abs(this.speed);
            this.flipX = true;
        }
        this.setVelocityX(this.speed);
    }

    attack(player) {
        // Implementar lógica de ataque aquí
    }
}