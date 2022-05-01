export function runEngineLoop(scene, camera, renderer, world, controls, vehicleMesh, vehicleBody) {
    animate()

    function animate() {
        requestAnimationFrame(animate)
        controls.update();
        // stats.update()
    
        //Всё что связанно с cannon jswwwww
        world.step(1 / 60)
        // update the chassis position
        vehicleMesh.position.copy(vehicleBody.position);
        vehicleMesh.quaternion.copy(vehicleBody.quaternion);
    
        //camera 
    
        // camera.position.x = box.position.x + 0
        // camera.position.y = box.position.y + 10
        // camera.position.z = box.position.z - 5;
    
        // camera.quaternion.copy(box.quaternion)
    
        // camera.rotateY(180 * Math.PI / 180)
        // camera.rotateX(-45 * Math.PI / 180)
        // cannonDebugRenderer.update(); // Update - CannonDebugRenderer
    
        //Конец всё что связанно с cannon js
    
        // stats.begin()
        renderer.render( scene, camera );
        // stats.end() 
    }
}

