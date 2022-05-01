import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';

export function initCamera(renderer, container) {
    const camera = new THREE.PerspectiveCamera(
        75,
        parseInt(container.style.width) / parseInt(container.style.height),
        0.1,
        1000
    )

    camera.position.x = 0
    camera.position.y = 20
    camera.position.z = -25;
    // camera.rotateY(180 * Math.PI / 180)
    // camera.rotateX(-15 * Math.PI / 180)

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update(); 
    controls.enableDamping = true;

    return {
        camera,
        controls
    }
}