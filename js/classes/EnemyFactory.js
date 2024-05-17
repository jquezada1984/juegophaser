import Xenomorph from './Xenomorph.js';
import Yautja from './Yautja.js';

export default class EnemyFactory {
    static createEnemy(type, scene, x, y) {
        switch (type) {
            case 'xenomorph':
                return new Xenomorph(scene, x, y);
            case 'yautja':
                return new Yautja(scene, x, y);
            default:
                throw new Error('Unknown enemy type');
        }
    }
}