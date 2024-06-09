export default class IEnemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.initSensors(scene);
    }

    initSensors(scene) {
        // Sensores para detectar los bordes
        this.leftSensor = scene.add.zone(this.x - 16, this.y + 16, 2, 2);
        this.rightSensor = scene.add.zone(this.x + 16, this.y + 16, 2, 2);

        scene.physics.add.existing(this.leftSensor);
        scene.physics.add.existing(this.rightSensor);

        this.leftSensor.body.setAllowGravity(false);
        this.rightSensor.body.setAllowGravity(false);
        this.leftSensor.body.moves = false;
        this.rightSensor.body.moves = false;
        
        scene.physics.add.overlap(this.leftSensor, scene.pisos, () => {}, null, this);
        scene.physics.add.overlap(this.rightSensor, scene.pisos, () => {}, null, this);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);        
        // Actualizar la posición de los sensores
        this.leftSensor.setPosition(this.x - 16, this.y + 16);
        this.rightSensor.setPosition(this.x + 16, this.y + 16);

        // Cambiar de dirección si un sensor no está en colisión
        if (!this.scene.physics.world.overlap(this.leftSensor, this.scene.pisos)) {
            this.setVelocityX(50);
            this.flipX = false;
        }
        if (!this.scene.physics.world.overlap(this.rightSensor, this.scene.pisos)) {
            this.setVelocityX(-50);
            this.flipX = true;
        }
    }

    move() {
        throw new Error('Se debe implementar el método move().');
    }

    attack() {
        throw new Error('Se debe implementar el método attack().');
    }
}
