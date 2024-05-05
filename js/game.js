var config = {
    type:Phaser.AUTO,
    scale: {
        mode:Phaser.Scale.FIT, // scala automaticamente
        autoCenter:Phaser.Scale.CENTER_BOTH, // centra automaticamente
        width:1920, // ancho de pantalla
        height:1080,// alto de pantalla
    },
    physics : {
        default:"arcade", // tipo de fisica que va a utilizar 
        arcade: {
            gravity: { y : 800},// la gravedad del juego
            debug: true // debug
        }
    },

    scene:[scene1]
}

var game = new Phaser.Game(config);
var cursors;
var jugador;
var plataforma;