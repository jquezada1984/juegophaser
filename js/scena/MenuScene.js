export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        // Cargar cualquier recurso necesario para el menú
        this.load.image('background', './assets/menu/background.png'); // Fondo del menú
        this.load.image('playButton', './assets/menu/play_button.png'); // Botón de jugar
        this.load.image('exitButton', './assets/menu/exit_button.png'); // Botón de salir
    }

    create() {
        // Agregar fondo y ajustar tamaño
        let background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        background.displayWidth = this.sys.game.config.width;
        background.displayHeight = this.sys.game.config.height;

        // Agregar botón de jugar
        const playButton = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 50, 'playButton').setInteractive();
        playButton.on('pointerdown', () => {
            this.scene.start('IntroScene'); // Cambiar a la escena de introducción
        });

        // Agregar botón de salir
        const exitButton = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 50, 'exitButton').setInteractive();
        exitButton.on('pointerdown', () => {
            console.log('Salir seleccionado');
            window.close(); // Para cerrar la ventana del navegador (no siempre es soportado por todos los navegadores)
        });

        // Agregar el texto con los nombres de los creadores
        const creatorsText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 200, 
            "GRUPO: 06\n🤺Kevin William Mateo Yulan 🤖\n🤺John Kleber Quezada Huayamave 🤖\n🤺Héctor Moisés Cela Guambo 🤖\n🤺Bryan Anthony Garzón Franco 🤖", 
            { fontSize: '50px', fill: '#ffffff', align: 'center' }).setOrigin(0.5);
    }
}

