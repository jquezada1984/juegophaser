export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(1);
        this.setSize(30, 50);
        this.setOffset(35, 18);

        this.initAnimations(scene);
    }

    initAnimations(scene) {
        scene.anims.create({
            key: "detenido",
            frames: scene.anims.generateFrameNumbers("jugador", { start: 0, end: 6 }),
            frameRate: 7,
            repeat: -1
        });

        scene.anims.create({
            key: "caminar",
            frames: scene.anims.generateFrameNumbers("jugador", { start: 16, end: 23 }),
            frameRate: 10,
            repeat: -1
        });
    }

    move(cursors) {
        if (cursors.right.isDown) {
            this.setVelocityX(180);
            this.anims.play("caminar", true);
            this.setOffset(35, 14);
            if (this.flipX) {
                this.x -= 45;
            }
            this.flipX = false;
        } else if (cursors.left.isDown) {
            this.setVelocityX(-180);
            this.anims.play("caminar", true);
            this.setOffset(3, 14);
            if (!this.flipX) {
                this.x += 45;
            }
            this.flipX = true;
        } else {
            this.setVelocityX(0);
            this.anims.play("detenido", true);
        }

        if (cursors.up.isDown && (this.body.touching.down || this.body.onFloor())) {
            this.setVelocityY(-350);
        }
    }
}