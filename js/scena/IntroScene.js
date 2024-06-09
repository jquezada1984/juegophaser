export default class IntroScene extends Phaser.Scene {
    constructor() {
        super("IntroScene");
    }

    preload() {
        this.load.image("intro1", "./assets/story/Inicio01.jpg");
        this.load.image("intro2", "./assets/story/Inicio02.jpg");
        this.load.image("intro3", "./assets/story/Inicio03.jpg");
        this.load.image("intro4", "./assets/story/capitulo1.png");
        this.load.audio('introSound', './assets/sonido/frankum__epic-intro-guitar.mp3');
    }

    create() {
        this.sound.play('introSound', { volume: 1.0 });

        this.intro1 = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "intro1");
        this.intro1.setAlpha(0);
        
        this.intro2 = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "intro2");
        this.intro2.setAlpha(0);
        
        this.intro3 = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "intro3");
        this.intro3.setAlpha(0);
        
        this.text = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 100, "", {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);
        this.text.setAlpha(0);

        this.showImage(this.intro1, "En un futuro distante, los portales se abrieron...");
    }

    showImage(image, text) {
        this.tweens.add({
            targets: image,
            alpha: 1,
            duration: 2000,
            onComplete: () => {
                this.showText(text);
            }
        });
    }

    showText(text) {
        this.text.setText(text);
        this.tweens.add({
            targets: this.text,
            alpha: 1,
            duration: 2000,
            onComplete: () => {
                this.time.delayedCall(3000, () => {
                    this.hideText();
                });
            }
        });
    }

    hideText() {
        this.tweens.add({
            targets: this.text,
            alpha: 0,
            duration: 2000,
            onComplete: () => {
                if (this.text.text === "En un futuro distante, los portales se abrieron...") {
                    this.showImage(this.intro2, "Un soldado valiente se levantó para defender su mundo...");
                } else if (this.text.text === "Un soldado valiente se levantó para defender su mundo...") {
                    this.showImage(this.intro3, "Comienza una feroz batalla contra los invasores...");
                } else {
                    this.scene.start("nivel1");
                }
            }
        });
    }
}