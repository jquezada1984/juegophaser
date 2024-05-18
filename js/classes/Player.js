export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(1);
        this.setSize(28, 50);
        this.setOffset(35, 18);
        this.initAnimations(scene);
        this.speed = 120;
        this.movimiento=45;
        this.jumpHeight = -350;
        this.health = 100;
        this.maxHealth = 100; 
        this.healthBar = this.createHealthBar(scene, x, y);
        this.healthText = this.createHealthText(scene, x, y);
        this.isPushed = false;
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
        if (!this.isPushed) {
            if (cursors.right.isDown) {
                this.setVelocityX(Math.abs(this.speed));
                this.anims.play("caminar", true);
                this.setOffset(35, 14);
                if (this.flipX) {
                    this.x -= this.movimiento;
                }
                this.flipX = false;
            } else if (cursors.left.isDown) {
                this.setVelocityX(-Math.abs(this.speed));
                this.anims.play("caminar", true);
                this.setOffset(3, 14);
                if (!this.flipX) {
                    this.x += this.movimiento;
                }
                this.flipX = true;
            } else {
                this.setVelocityX(0);
                this.anims.play("detenido", true);
            }

            if (cursors.up.isDown && (this.body.touching.down || this.body.onFloor())) {
                this.setVelocityY(this.jumpHeight);
            }
        }
        this.updateHealthBar();
        this.updateHealthText();
    }

    createHealthBar(scene, x, y) {
        let bar = scene.add.graphics();
        bar.fillStyle(0x00ff00, 1);
        bar.fillRect(x - 50, y - 75, 100, 10);
        return bar;
    }

    updateHealthBar() {
        this.healthBar.clear();
        this.healthBar.fillStyle(0x00ff00, 1);
        this.healthBar.fillRect(this.x - 50, this.y - 75, this.health, 10);
    }

    createHealthText(scene, x, y) {
        return scene.add.text(x - 50, y - 90, `${this.health}/${this.maxHealth}`, {
            fontSize: '12px',
            fill: '#ffffff'
        });
    }

    updateHealthText() {
        this.healthText.setText(`${this.health}/${this.maxHealth}`);
        this.healthText.setPosition(this.x - 50, this.y - 90);
    }
}