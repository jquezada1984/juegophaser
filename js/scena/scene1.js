class scene1 extends Phaser.Scene {

    constructor () {
        super ("nivel1"); // nombre escena
    }
 
    preload () {
        this.load.image("fondo",".//assets/Background.png"); // decimos donde esta la imagen a phaser65.14
        this.load.spritesheet("jugador",".//assets/sprites/complet01.png",{ frameWidth: 65.14,frameHeight: 79}); // Cargamos la imagen del jugador
    }

    create () {
        //animaciones
        this.anims.create({
            key: "detenido", // nombre de la animacion
            frames: this.anims.generateFrameNumbers("jugador",{start:0,end:6}),// desde que frame hasta que frame
            frameRate:7,// velocidad de animacion
            repeat:-1// si se va a reptir y cuantas veces, al estar en -1 se repite infinito
        });

        this.anims.create({
            key: "caminar",
            frames: this.anims.generateFrameNumbers("jugador",{start:7,end:13}),
            frameRate:10,
            repeat:-1
        });

        // Fondo
        let fondo = this.add.image(930,530,"fondo"); // agregamos el fondo a la escena
        fondo.setScale(3.5);//escalamos el fondo
        //plataforma


        //Jugador
        jugador= this.physics.add.sprite(0,0,"jugador"); //agregamos el jugador a la escena         
        jugador.setScale(3);// escalamos el jugador
        jugador.setSize(30,50); //Tamaño del Jugador
        jugador.setOffset(35,18);
        jugador.setCollideWorldBounds(true);// hacemos que colisione con el borde del mundo
        
        //Teclas
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
             jugador.anims.play("detenido",true);
         }
         if (cursors.up.isDown && jugador.body.touching.down) {  /// si se presiona la tecla arriba y  el personaje esta tocando algo abajo salta
            jugador.setVelocityY(-500);
            }

    }

}