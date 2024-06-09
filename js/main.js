import MenuScene from './scena/MenuScene.js';
import IntroScene from './scena/IntroScene.js';
import Scene1 from './scena/scene1.js';


export const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1800,
        height: 1200,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 800 },
            debug: true
        }
    },
    scene: [MenuScene, ,IntroScene,Scene1]
};

export default config;