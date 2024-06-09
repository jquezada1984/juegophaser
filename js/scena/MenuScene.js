export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        // Cargar la imagen como un spritesheet
        this.load.spritesheet('buttons', './assets/menu/boton.png', { frameWidth: 100, frameHeight: 68 });
    }

    create() {
        // Agregar botón de jugar
        const playButton = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2 - 50, 'buttons', 1).setInteractive();
        playButton.on('pointerdown', () => {
            this.scene.start('IntroScene'); // Cambiar a la escena de introducción
        });

        // Agregar botón de salir
        const exitButton = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2 + 50, 'buttons', 12).setInteractive();
        exitButton.on('pointerdown', () => {
            console.log('Salir seleccionado');
            // Puedes cerrar la ventana del juego aquí si es una aplicación de escritorio
        });
    }
}
