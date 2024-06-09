import IEnemy from '../interfaces/IEnemy.js';

export default class Xenomorph extends IEnemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'xenomorph');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = 200;
        this.jumpHeight = -500;
        this.health = 50;
        this.setScale(3);
        this.setSize(32,15);
        this.setOffset(0,15);
        this.isAttacking = false;
        this.initAnimations(scene);
    }

    initAnimations(scene) {
        scene.anims.create({
            key: 'xenomorphMove',
            frames: scene.anims.generateFrameNumbers('xenomorph', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({
            key: 'xenomorphAttack',
            frames: scene.anims.generateFrameNumbers('XenomorphAttack', { start: 0, end: 5 }),
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
        if (!this.isAttacking) {
            this.isAttacking = true;
            this.anims.play('xenomorphAttack', true);
            player.health -= 20;
            if (this.body.touching.right) {
                player.setVelocityX(-300);
            } else if (this.body.touching.left){
                player.setVelocityX(300);
            }
            // Apply vertical push to simulate knockback
            player.setVelocityY(-200);
            this.scene.time.delayedCall(1000, () => {
                this.isAttacking = false;
                this.anims.play('xenomorphMove');
            }, [], this);
        }
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.destroy();
        }
    }
}