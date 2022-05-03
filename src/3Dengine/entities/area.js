import * as THREE from 'three';
import * as CANNON from 'cannon';

export function createArea(scene, world) {
    const geometry = new THREE.BoxGeometry(50, 0.3, 50);
    const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
    let cube = new THREE.Mesh( geometry, material );
    cube.position.y = -0.6
    cube.receiveShadow = true;
    scene.add( cube );
    

    let groundBody = new CANNON.Body({
        mass: 0
    }) //Создаём тело
    let groundShape = new CANNON.Plane(0.1, 0.2) //Создаём форму
    groundBody.addShape(groundShape) //Соеденяем
    groundBody.position.set(0, 0.15, 0)
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2) //Поворачиваем в горизонтальное положение
    world.addBody(groundBody) //Добовляем скелет в мир

    // Плоскости - стенки
    // plane
    var planeBody = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(0, 0, 25) // Изменяем позицию 
    });
    var planeShape = new CANNON.Plane(0.1 ,0.2);
    planeBody.addShape(planeShape);
    planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), Math.PI); //Поворачиваем
    world.addBody(planeBody);
    
    //plane2
    var planeBody1 = new CANNON.Body({
        mass: 0,
        position: new CANNON.Vec3(-25, 0, 0)
    });
    var planeShape1 = new CANNON.Plane(0.1 ,0.2);
    planeBody1.addShape(planeShape1);
    planeBody1.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0), Math.PI / 2);
    world.addBody(planeBody1);
    
    //plane3
    var planeBody2 = new CANNON.Body({
        mass: 0,
        position: new CANNON.Vec3(25, 0, 0)
    });
    var planeShape2 = new CANNON.Plane(0.1 ,0.2);
    planeBody2.addShape(planeShape2);
    planeBody2.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0), -Math.PI / 2);
    world.addBody(planeBody2);
    
    //plane4
    var planeBody3 = new CANNON.Body({
        mass: 0,
        position: new CANNON.Vec3(0, 0, -25)
    });
    // var planeShape3 = new CANNON.Plane(0.1 ,0.2);
    planeBody3.addShape(planeShape2);
    planeBody3.quaternion.setFromAxisAngle(new CANNON.Vec3(0,0,1), -Math.PI);
    world.addBody(planeBody3);
}