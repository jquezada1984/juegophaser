class scene1 extends Phaser.Scene {

    constructor () {
        super ("nivel1"); // nombre escena
    }
 
    preload () {
        this.load.image("Fondo",".//assets/Background.png"); // decimos donde esta la imagen a phaser
       
    }

    create () {

        var fondo = this.add.image(930,530,"Fondo"); // agregamos el fondo a la escena
        fondo.setScale(3.5);//escalamos el fondo 

    }

    update () {

    }

}