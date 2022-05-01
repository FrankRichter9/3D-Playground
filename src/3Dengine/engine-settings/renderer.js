import * as THREE from 'three';

export function initRenderer(container){
    const renderer = new THREE.WebGLRenderer();

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize( container.clientWidth, container.clientHeight );
    container.appendChild( renderer.domElement );
    renderer.shadowMap.enabled = true;

    return renderer
}