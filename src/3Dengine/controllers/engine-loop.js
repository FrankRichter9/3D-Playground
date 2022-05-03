let END_GAME = false

export function runEngineLoop(
        scene,
        camera,
        renderer,
        world,
        controls,
        vehicleMesh,
        vehicleBody,
        vehicle,
        endPoint
    ) {
    animate()

    function animate() {
        requestAnimationFrame(animate)
        controls.update();
        // stats.update()
    
        //Всё что связанно с cannon js
        world.step(1 / 60)
        // update the chassis position
        vehicleMesh.position.copy(vehicleBody.position);
        vehicleMesh.quaternion.copy(vehicleBody.quaternion);

        const END_POINT_X = endPoint.position[0]
        const END_POINT_Z = endPoint.position[2]
        const VEHICLE_POSITION = vehicle.chassisBody.position

        if(
            Math.abs(VEHICLE_POSITION.x - END_POINT_X) < 1
            && Math.abs(VEHICLE_POSITION.z - END_POINT_Z) < 1
            && !END_GAME
        ){
            END_GAME = true
            alert('Карта пройдена!')
        }
    
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

