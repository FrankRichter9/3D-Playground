import * as THREE from 'three';
import * as CANNON from 'cannon';
import * as OrbitControls from 'three-orbitcontrols';

import { initCamera } from './camera'
import { initRenderer } from './renderer'
import { initLight } from './light'

export function init3DRenderer(container) {


      //scene
    const  scene = new THREE.Scene()
  
    const camera = initCamera()
    const renderer = initRenderer(container) 
    
  
      cube
      const geometry = new THREE.BoxGeometry(50, 0.3, 50);
      const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
      let cube = new THREE.Mesh( geometry, material );
      cube.receiveShadow = true;
      scene.add( cube );
  
      //wall1
      const geometryWall1 = new THREE.BoxGeometry(20, 5, 0.5);
      const materialWall1 = new THREE.MeshPhongMaterial( { color: 0xffffff } );
      let cubeWall1 = new THREE.Mesh( geometryWall1, materialWall1 );
      cubeWall1.receiveShadow = true;
      cubeWall1.castShadow = true;
      cubeWall1.position.z = 10
      scene.add( cubeWall1 );
  
  
    initLight(scene)
      
  
      
  
      // const helper = new THREE.DirectionalLightHelper(light);
      // scene.add(helper);
  
      //stats
      // const stats = Stats()
      // container.appendChild(stats.dom)
  
      // Orbit Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.update(); 
      controls.enableDamping = true; 
      
      //CANNON JS
      //World
      let world = new CANNON.World() // Создаём мир
      world.gravity.set(0, -9.8, 0) // Задаём гравитацию
  
      
  
      //plane
      let groundBody = new CANNON.Body({
          mass: 0
      }) //Создаём тело
      let groundShape = new CANNON.Plane(0.1, 0.2) //Создаём форму
      groundBody.addShape(groundShape) //Соеденяем
      groundBody.position.set(0, 0.15, 0)
      groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2) //Поворачиваем в горизонтальное положение
      world.addBody(groundBody) //Добовляем скелет в мир
  
      //cube 
      var cubeBody = new CANNON.Body({
          mass: 0,
          position: new CANNON.Vec3(0, 0, 10)
      })
      var cubeShape = new CANNON.Box(new CANNON.Vec3(10,  5 , 0.25)) //(new CANNON.Vec3(0.3,  0.5 , 0.2)) - размеры скелета куба
      cubeBody.addShape(cubeShape)
      world.addBody(cubeBody)
  
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
  
      // cylinderMesh.quaternion.set(
      //     cylinderBody.quaternion.x,
      //     cylinderBody.quaternion.y,
      //     cylinderBody.quaternion.z,
      //     cylinderBody.quaternion.w,
      // )
  
      // world.addBody(cylinderBody)
      // world.addBody(cylinderBody1)
  
  
      //os
  
      const os = new CANNON.Cylinder(0.05, 0.05, 2, 50)
      // cylinderShape.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2);
      const osBody = new CANNON.Body({ mass: 1 })
      osBody.addShape(os, new CANNON.Vec3())
      // osrBody.position.x = cylinderMesh.position.x
      // osrBody.position.y = cylinderMesh.position.y
      // osrBody.position.z = cylinderMesh.position.z
      // world.addBody(osBody)
  
  
      ////////
  
      // car physics body
  var chassisShape = new CANNON.Box(new CANNON.Vec3(1, 0.3, 2));
  var chassisBody = new CANNON.Body({mass: 150});
  chassisBody.addShape(chassisShape);
  chassisBody.position.set(0, 0.2, 0);
  chassisBody.angularVelocity.set(0, 0, 0); // initial velocity
  
  // car visual body
  var geometry22 = new THREE.BoxGeometry(2, 0.6, 4); // double chasis shape
  var material22 = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
  var box = new THREE.Mesh(geometry22, material22);
  box.castShadow = true;
  scene.add(box);
  
  // parent vehicle object
  var vehicle = new CANNON.RaycastVehicle({
    chassisBody: chassisBody,
    indexRightAxis: 0, // x
    indexUpAxis: 1, // y
    indexForwardAxis: 2, // z
  });
  
  // wheel options
  var options = {
    radius: 0.3,
    directionLocal: new CANNON.Vec3(0, -1, 0),
    suspensionStiffness: 45,
    suspensionRestLength: 0.4,
    frictionSlip: 5,
    dampingRelaxation: 2.3,
    dampingCompression: 4.5,
    maxSuspensionForce: 200000,
    rollInfluence:  0.01,
    axleLocal: new CANNON.Vec3(-1, 0, 0),
    chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
    maxSuspensionTravel: 0.25,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true,
  };
  
  var axlewidth = 1;
  options.chassisConnectionPointLocal.set(axlewidth, 0, -1);
  vehicle.addWheel(options);
  
  options.chassisConnectionPointLocal.set(-axlewidth, 0, -1);
  vehicle.addWheel(options);
  
  options.chassisConnectionPointLocal.set(axlewidth, 0, 1);
  vehicle.addWheel(options);
  
  options.chassisConnectionPointLocal.set(-axlewidth, 0, 1);
  vehicle.addWheel(options);
  
  vehicle.addToWorld(world);
  
  // car wheels
  var wheelBodies = [],
      wheelVisuals = [];
  vehicle.wheelInfos.forEach(function(wheel) {
    var shape = new CANNON.Cylinder(wheel.radius, wheel.radius, wheel.radius / 2, 20);
    var body = new CANNON.Body({mass: 1, material: material22});
    var q = new CANNON.Quaternion();
    q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
    body.addShape(shape, new CANNON.Vec3(), q);
    body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1,0),90 * Math.PI/180);
    wheelBodies.push(body);
    // wheel visual body
    var geometry12 = new THREE.CylinderGeometry( wheel.radius, wheel.radius, 0.4, 32 );
    var material = new THREE.MeshPhongMaterial({
      color: 0xd0901d,
      emissive: 0xaa0000,
      side: THREE.DoubleSide,
      flatShading: true,
    });
    var cylinder = new THREE.Mesh(geometry12, material);
    cylinder.castShadow = true;
    cylinder.geometry.rotateZ(Math.PI/2);
    
    wheelVisuals.push(cylinder);
    scene.add(cylinder);
  });
  
  
  world.addEventListener('postStep', function() {
      for (var i=0; i<vehicle.wheelInfos.length; i++) {
        vehicle.updateWheelTransform(i);
        var t = vehicle.wheelInfos[i].worldTransform;
        // update wheel physics
        wheelBodies[i].position.copy(t.position);
        wheelBodies[i].quaternion.copy(t.quaternion);
        // update wheel visuals
        wheelVisuals[i].position.copy(t.position);
        wheelVisuals[i].quaternion.copy(t.quaternion);
      }
    });
      /////
      
  
  
      // CannonDebugRenderer 
      // const cannonDebugRenderer = new CannonDebugRenderer(scene, world);
  
      function animate() {
          requestAnimationFrame(animate)
          controls.update();
          // stats.update()
  
          //Всё что связанно с cannon js
          world.step(1 / 60)
          // update the chassis position
          box.position.copy(chassisBody.position);
          box.quaternion.copy(chassisBody.quaternion);
  
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
      animate()
  
      function navigate(e) {
          if (e.type != 'keydown' && e.type != 'keyup') return;
          var keyup = e.type == 'keyup';
          vehicle.setBrake(0, 0);
          vehicle.setBrake(0, 1);
          vehicle.setBrake(0, 2);
          vehicle.setBrake(0, 3);
        
          var engineForce = 200,
              maxSteerVal = 0.6;
              
          switch(e.key) {
        
            case 'w': // forward
              vehicle.applyEngineForce(keyup ? 0 : -engineForce, 2);
              vehicle.applyEngineForce(keyup ? 0 : -engineForce, 3);
              break;
        
            case 's': // backward
              vehicle.applyEngineForce(keyup ? 0 : engineForce, 2);
              vehicle.applyEngineForce(keyup ? 0 : engineForce, 3);
              break;
        
            case 'd': // right
              vehicle.setSteeringValue(keyup ? 0 : -maxSteerVal, 2);
              vehicle.setSteeringValue(keyup ? 0 : -maxSteerVal, 3);
              break;
        
            case 'a': // left
              vehicle.setSteeringValue(keyup ? 0 : maxSteerVal, 2);
              vehicle.setSteeringValue(keyup ? 0 : maxSteerVal, 3);
              break;
          }
        }
        
        window.addEventListener('keydown', navigate)
        window.addEventListener('keyup', navigate)
  }