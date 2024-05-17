import IScene from '../interfaces/IScene.js';
import Player from '../classes/Player.js';
import EnemyFactory from '../classes/EnemyFactory.js';

export default class scene1 extends IScene {

    constructor () {
        super ("nivel1"); // nombre escena
    }
 
    preload () {
        this.load.image("fondo",".//assets/rooms/Business-Center-Tileset-Pixel-Art4.png"); // decimos donde esta la imagen a phaser65.14
        this.load.spritesheet("jugador",".//assets/sprites/complet01.png",{ frameWidth: 65.14,frameHeight: 79}); // Cargamos la imagen del jugador
        //////////////////////////////////////////////
        this.load.spritesheet("xenomorph",".//assets/sprites/rat-run-outline.png",{ frameWidth: 32,frameHeight: 32}); // Cargamos la imagen del jugador
        
        //////////////////Pisos///////////
        this.load.image("Objetos",".//assets/rooms/Objetos.png"); // objetos en la pantalla
        this.load.image("Pisos",".//assets/rooms/Pisos.png"); // objetos en la pantalla
        this.load.tilemapTiledJSON("tilemap",".//assets/rooms/mapa.json") // donde esta el achivo json        
    }

    create () {
        this.fondo = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, "fondo");
        this.fondo.setOrigin(0, 0);

        //////////PISOS///////////////
        const map = this.make.tilemap({key:"tilemap"});
        const tileset = [ 
                map.addTilesetImage("Business-Center-Tileset-Pixel-Art4","fondo"), 
                map.addTilesetImage("Objetos","Objetos"), 
                map.addTilesetImage("Pisos","Pisos")
            ];
        this.pisos = map.createLayer("Piso1",tileset);
        this.pisos.setCollisionByProperty({colision:true});
        
        //Jugador
        this.player = new Player(this, 66, 1150, "jugador");

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(3); 

        //Teclas
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player,this.pisos);

        ///Enemigos
        this.enemies = [
            EnemyFactory.createEnemy('xenomorph', this, 100, 1150),
        //    EnemyFactory.createEnemy('yautja', this, 600, 1150)
        ];

        this.enemies.forEach(enemy => {
            this.physics.add.collider(enemy,this.pisos);
            this.physics.add.collider(this.player, enemy, this.handlePlayerEnemyCollision, null, this);
        });

    }

    update () {
        this.player.move(this.cursors);
        this.enemies.forEach(enemy => enemy.move());
    }

    handlePlayerEnemyCollision(player, enemy) {
        // Implementar lógica de colisión entre jugador y enemigo
    }
}