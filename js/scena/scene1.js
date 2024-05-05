class scene1 extends Phaser.Scene {

    constructor () {
        super ("nivel1"); // nombre escena
    }
 
    preload () {
        this.load.image("fondo",".//assets/Background.png"); // decimos donde esta la imagen a phaser
        this.load.spritesheet("jugador",".//assets/sprites/Jugador01.png",{ frameWidth: 70,frameHeight: 50}); // Cargamos la imagen del jugador
    }

    create () {
        let fondo = this.add.image(930,530,"fondo"); // agregamos el fondo a la escena
        jugador= this.physics.add.sprite(0,0,"jugador"); //agregamos el jugador a la escena
        fondo.setScale(3.5);//escalamos el fondo 
        jugador.setScale(3);// escalamos el jugador
        jugador.setCollideWorldBounds(true);// hacemos que colisione con el borde del mundo
        cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
        // manejo del jugador en el plano x
        if (cursors.right.isDown) {  // si la tecla derecha esta presionada move al personaje en el eje x con una velocidad de 180
            jugador.setVelocityX(180); 
         }else if (cursors.left.isDown) {
             jugador.setVelocityX(-180); // si la tecla derecha esta presionada move al personaje en el eje x con una velocidad de -180
         }else {
             jugador.setVelocityX(0); // si no estan ninguna de estas teclas presionadas su velocidad es 0
         }
    }

}