export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(1);
        this.setSize(28, 50);
        this.setOffset(35, 18);
        this.speed = 120;
        this.jumpHeight = -350;
        this.health = 100;
        this.maxHealth = 100;
        this.healthBar = this.createHealthBar(scene, x, y);
        this.healthText = this.createHealthText(scene, x, y);
        this.isPushed = false;
        this.isShooting = false;
        this.isDying = false; // Nueva propiedad para gestionar el estado de muerte
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

        scene.anims.create({
            key: "disparar",
            frames: scene.anims.generateFrameNumbers("jugador", { start: 22, end: 25 }),
            frameRate: 10,
            repeat: 0
        });

        scene.anims.create({
            key: "morir",
            frames: scene.anims.generateFrameNumbers("jugador", { start: 32, end: 38 }), // Suponiendo que estos son los frames de la animación de morir
            frameRate: 10,
            repeat: 0
        });
    }

    move(cursors, keys) {
        if (!this.isPushed && !this.isShooting && !this.isDying) {
            let horizontalVelocity = 0;

            if (cursors.right.isDown || keys.D.isDown) {
                horizontalVelocity += this.speed;
                this.flipX = false;
            }
            if (cursors.left.isDown || keys.A.isDown) {
                horizontalVelocity -= this.speed;
                this.flipX = true;
            }

            this.setVelocityX(horizontalVelocity);

            if ((cursors.up.isDown || keys.W.isDown) && (this.body.touching.down || this.body.onFloor())) {
                this.setVelocityY(this.jumpHeight);
            }

            if (horizontalVelocity !== 0) {
                this.anims.play("caminar", true);
                if (this.flipX) {
                    this.setOffset(3, 14);
                } else {
                    this.setOffset(35, 14);
                }
            } else {
                this.anims.play("detenido", true);
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
        this.healthBar.fillRect(this.x - 50, this.y - 75, (this.health / this.maxHealth) * 100, 10);
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

    shoot() {
        if (!this.isShooting) {
            this.isShooting = true;
            this.anims.play("disparar", true).on('animationcomplete', () => {
                this.isShooting = false;
                this.anims.play("detenido", true);
            });
        }
    }

    die() {
        this.isDying = true;
        this.anims.play("morir", true);
    }
}
