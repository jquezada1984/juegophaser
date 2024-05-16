import MovingEnemy from './MovingEnemy.js';

export default class EnemyFactory {
    static createEnemy(type, scene, x, y) {
        switch (type) {
            case 'moving':
                return new MovingEnemy(scene, x, y, 'enemy', 100);
            default:
                throw new Error('Unknown enemy type');
        }
    }
}
