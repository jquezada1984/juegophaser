export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        this.load.image('background', './assets/menu/background.png'); // Fondo del menú
        this.load.image('playButton', './assets/menu/play_button.png'); // Botón de jugar
        this.load.image('exitButton', './assets/menu/exit_button.png'); // Botón de salir
    }

    create() {
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.resizeBackground();

        // Agregar botón de jugar
        const playButton = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 50, 'playButton').setInteractive();
        playButton.on('pointerdown', () => {
            this.scene.start('IntroScene');
        });

        // Agregar botón de salir
        const exitButton = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 50, 'exitButton').setInteractive();
        exitButton.on('pointerdown', () => {
            console.log('Salir seleccionado');
            window.close();
        });

        // Ajustar tamaño dinámicamente cuando se cambia el tamaño de la ventana
        this.scale.on('resize', this.resizeBackground, this);
    }

    resizeBackground() {
        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        this.background.displayWidth = width;
        this.background.displayHeight = height;
    }
}
