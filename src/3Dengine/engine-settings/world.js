import * as CANNON from 'cannon';

export function initWorld() {
    const world = new CANNON.World() // Создаём мир
    world.gravity.set(0, -9.8, 0) // Задаём гравитацию

    return world
}