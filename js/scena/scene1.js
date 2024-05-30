import IScene from '../interfaces/IScene.js';
import Player from '../classes/Player.js';
import EnemyFactory from '../classes/EnemyFactory.js';
import Xenomorph from '../classes/Xenomorph.js'; // Importa Xenomorph
import Yautja from '../classes/Yautja.js';       // Importa Yautja

export default class scene1 extends IScene {
    score = 0;
    scoreText;

    constructor () {
        super ("nivel1"); // nombre escena
    }

    preload () {
        // Carga de recursos
        this.load.image('item', './/assets/sprites/box.png'); // Imagen del objeto coleccionable
        this.load.image('overlay', './/assets/story/capitulo1.png'); // Imagen superpuesta
        this.load.image("fondo", ".//assets/rooms/Business-Center-Tileset-Pixel-Art4.png"); // Fondo
        this.load.spritesheet("jugador", ".//assets/sprites/complet01.png", { frameWidth: 65.14, frameHeight: 79 }); // Jugador
        this.load.spritesheet("xenomorph", ".//assets/sprites/rat-run-outline.png", { frameWidth: 32, frameHeight: 30 });
        this.load.spritesheet("XenomorphAttack", ".//assets/sprites/rat-attack-outline.png", { frameWidth: 32, frameHeight: 32 });
        this.load.image("Objetos", ".//assets/rooms/Objetos.png"); // Objetos en la pantalla
        this.load.image("Pisos", ".//assets/rooms/Pisos.png"); // Pisos en la pantalla
        this.load.tilemapTiledJSON("tilemap", ".//assets/rooms/mapa.json") // Archivo JSON
        this.load.audio('cityAmbience', './assets/sonido/City Sounds.mp3');
    }

    create () {
        this.sound.play('cityAmbience', { volume: 0.5, loop: true });

        this.fondo = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, "fondo");
        this.fondo.setOrigin(0, 0);

        const map = this.make.tilemap({ key: "tilemap" });
        const tileset = [
            map.addTilesetImage("Business-Center-Tileset-Pixel-Art4", "fondo"),
            map.addTilesetImage("Objetos", "Objetos"),
            map.addTilesetImage("Pisos", "Pisos")
        ];
        this.pisos = map.createLayer("Piso1", tileset);
        this.pisos.setCollisionByProperty({ colision: true });

        // Jugador
        this.player = new Player(this, 66, 1150, "jugador");

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(3);

        // Teclas
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.physics.add.collider(this.player, this.pisos);

        // Enemigos
        this.enemies = [
            EnemyFactory.createEnemy('xenomorph', this, 100, 1150),
        ];

        this.enemies.forEach(enemy => {
            this.physics.add.collider(enemy, this.pisos);
            this.physics.add.collider(this.player, enemy, this.handlePlayerEnemyCollision, null, this);
        });

        // Crear el objeto coleccionable 1
        this.item = this.physics.add.sprite(240, 1180, 'item').setScale(1, 1);
        this.physics.add.collider(this.item, this.pisos);
        this.physics.add.overlap(this.player, this.item, this.collectItem, null, this);

        // Crear el texto del puntaje
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

        // Crear grupo de balas
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 10
        });

        this.physics.add.overlap(this.bullets, this.enemies, this.handleBulletEnemyCollision, null, this);
    

    }

    update () {
        this.enemies.forEach(enemy => enemy.move());
        this.player.move(this.input.keyboard.createCursorKeys(), this.input.keyboard.addKeys('W,A,S,D'));

        if (Phaser.Input.Keyboard.JustDown(this.spaceBar)){
            this.shootBullet();
        }

        this.enemies.forEach(enemy => enemy.move());
    }

    collectItem(player, item) {
        item.disableBody(true, true);

        // Actualizar el puntaje
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }

    handlePlayerEnemyCollision(player, enemy) {
        if (enemy instanceof Xenomorph) {
            enemy.attack(player);
            player.isPushed = true;
            this.time.delayedCall(300, () => {
                player.isPushed = false;
            });
        }
        if (player.health <= 0) {
            this.scene.restart();
        }
    }

    shootBullet() {
        const bullet = this.bullets.get(this.player.x, this.player.y);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.allowGravity = false;
            if (this.player.flipX) { // Si el jugador está mirando a la izquierda
                bullet.setPosition(this.player.x - 20, this.player.y);
                bullet.body.velocity.x = -500; // Velocidad de la bala hacia la izquierda
            } else { // Si el jugador está mirando a la derecha
                bullet.setPosition(this.player.x + 20, this.player.y);
                bullet.body.velocity.x = 500; // Velocidad de la bala hacia la derecha
            }
        }
    }

    handleBulletEnemyCollision(bullet, enemy) {
        bullet.disableBody(true, true);
        if (enemy instanceof Xenomorph) {
            enemy.takeDamage(10); // Llamar a takeDamage del enemigo
        }
    }
}
