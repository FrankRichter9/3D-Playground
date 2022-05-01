import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';

export function initCamera(renderer) {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 )

    camera.position.x = 0
    camera.position.y = 10
    camera.position.z = -5;
    camera.rotateY(180 * Math.PI / 180)
    camera.rotateX(-45 * Math.PI / 180)

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update(); 
    controls.enableDamping = true;

    return {
        camera,
        controls
    }
}