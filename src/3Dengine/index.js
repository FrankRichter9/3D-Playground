import * as THREE from 'three';

import { initCamera } from './entities/camera'
import { initRenderer } from './engine-settings/renderer'
import { initLight } from './entities/light'
import { initWorld } from './engine-settings/world'

import { createArea } from './entities/area'
import { createMap } from './entities/map'
import { createCar } from './entities/car'

import { runEngineLoop } from './controllers/engine-loop'
import { initButtonControls } from './controllers/button-controls'

export function init3DRenderer(container) {

  //THREE JS
  const scene = new THREE.Scene()
  const renderer = initRenderer(container) 
  const {
    camera,
    controls
  } = initCamera(renderer)

  initLight(scene)

  //CANNON JS
  const world = initWorld()
    
  
  createArea(scene, world)

  const MAP = {
    walls: [
      {
        size: [20, 5, 0.5],
        position: [0, 0, 10],
        mass: 0
      },
      {
        size: [10, 5, 0.5],
        position: [10, 0, 20],
        mass: 0
      },
    ]
  }

  createMap(scene, world, MAP)
    
  // const helper = new THREE.DirectionalLightHelper(light);
  // scene.add(helper);
  
  //stats
  // const stats = Stats()
  // container.appendChild(stats.dom)

  const {
    vehicle,
    vehicleBody,
    vehicleMesh
  } = createCar(scene, world)
  
  runEngineLoop(scene, camera, renderer, world, controls, vehicleMesh, vehicleBody)
  
  initButtonControls(vehicle)
      
  // CannonDebugRenderer 
  // const cannonDebugRenderer = new CannonDebugRenderer(scene, world);
    
}