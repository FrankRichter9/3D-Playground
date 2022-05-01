import * as THREE from 'three';

export function initLight(scene) {
    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(-26, 14, 26);
    light.castShadow = true
    scene.add(light);
    const d = 100;

    light.shadow.camera.left = - d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = - d;

    light.shadow.mapSize.width = 5512; // default
    light.shadow.mapSize.height = 5512; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500;

    const light2 = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    light2.position.set(26, 14, -26);
    scene.add(light2);


    const light1 = new THREE.DirectionalLight( 0xFFFFFF, 0.3 ); // soft white light
    // light1.castShadow = true
    scene.add( light1 )

    light1.shadow.camera.left = - d;
    light1.shadow.camera.right = d;
    light1.shadow.camera.top = d;
    light1.shadow.camera.bottom = - d;

    light1.shadow.mapSize.width = 5512; // default
    light1.shadow.mapSize.height = 5512; // default
    light1.shadow.camera.near = 0.5; // default
    light1.shadow.camera.far = 500;
}