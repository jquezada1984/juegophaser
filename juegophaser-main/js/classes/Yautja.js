import IEnemy from '../interfaces/IEnemy.js';

export default class Yautja extends IEnemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'yautja');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = 100;
        this.jumpHeight = -300;
        this.health = 100;

        this.initAnimations(scene);
    }

    initAnimations(scene) {
        scene.anims.create({
            key: 'yautjaMove',
            frames: scene.anims.generateFrameNumbers('yautja', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.play('yautjaMove');
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