import * as THREE from 'three';
import * as CANNON from 'cannon';

export function createMap(scene, world, MAP) {

    if(MAP.walls){
        const WALLS = MAP.walls

        WALLS.forEach(wall => {
            const geometryWall = new THREE.BoxGeometry(...wall.size);
            const materialWall = new THREE.MeshPhongMaterial( { color: 0xffffff } );
            let wallMesh = new THREE.Mesh( geometryWall, materialWall );

            wallMesh.receiveShadow = true;
            wallMesh.castShadow = true;
            
            wallMesh.position.set(...wall.position)
            scene.add( wallMesh );

            const wallBody = new CANNON.Body({
                mass: wall.mass,
                position: new CANNON.Vec3(...wall.position)
            })
            const wallShape = new CANNON.Box(new CANNON.Vec3(...wall.size.map(v => v/2)))

            wallBody.addShape(wallShape)
            world.addBody(wallBody)
        });
    }

    if(MAP.endPoint){
        const END_POINT = MAP.endPoint

        const geometryEndPoint = new THREE.BoxGeometry(8, 5, 8);
        const materialEndPoint = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
        materialEndPoint.transparent  = true
        materialEndPoint.opacity = 0.4
        let wallMesh = new THREE.Mesh( geometryEndPoint, materialEndPoint );
        
        wallMesh.position.set(...END_POINT.position)
        scene.add( wallMesh );
    }

    
}