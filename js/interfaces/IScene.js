
export default class IScene extends Phaser.Scene {
    constructor(sceneName) {
        super(sceneName);
    }

    preload() {
        throw new Error('Method preload() must be implemented.');
    }

    create() {
        throw new Error('Method create() must be implemented.');
    }

    update() {
        throw new Error('Method update() must be implemented.');
    }
}