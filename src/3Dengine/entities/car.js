import * as THREE from 'three';
import * as CANNON from 'cannon';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export function createCar(scene, world) {
    const vehicleShape = new CANNON.Box(new CANNON.Vec3(1, 0.3, 2));
    const vehicleBody = new CANNON.Body({mass: 150});
    vehicleBody.addShape(vehicleShape);
    vehicleBody.position.set(0, 0.9, -10);
    vehicleBody.angularVelocity.set(0, 0, 0); // initial velocity
  
    // car visual body
    const vehicleGeometry = new THREE.BoxGeometry(2, 0.6, 4); // double chasis shape
    const vehicleMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
    const vehicleMesh = new THREE.Mesh(vehicleGeometry, vehicleMaterial);
    vehicleMesh.castShadow = true;
    scene.add(vehicleMesh);

    const LOADING_MANAGER = new THREE.LoadingManager();
    const OBJ_LOADER = new OBJLoader(LOADING_MANAGER);

  
    // parent vehicle object
    const vehicle = new CANNON.RaycastVehicle({
        chassisBody: vehicleBody,
        indexRightAxis: 0, // x
        indexUpAxis: 1, // y
        indexForwardAxis: 2, // z
    });
  
    // wheel options
    const options = {
        radius: 0.0001,
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
  
    const axlewidth = 1;
    const top = 0
    options.chassisConnectionPointLocal.set(axlewidth, top, -1);
    vehicle.addWheel(options);
    
    options.chassisConnectionPointLocal.set(-axlewidth - 0.35, top, -1);
    vehicle.addWheel(options);
    
    options.chassisConnectionPointLocal.set(axlewidth, top, 1);
    vehicle.addWheel(options);
    
    options.chassisConnectionPointLocal.set(-axlewidth - 0.3, top, 1);
    vehicle.addWheel(options);
    
    vehicle.addToWorld(world);
  
  // car wheels
    const wheelBodies = [],
        wheelVisuals = [];
    vehicle.wheelInfos.forEach(function(wheel) {
        const shape = new CANNON.Cylinder(wheel.radius, wheel.radius, wheel.radius / 2, 20);
        const body = new CANNON.Body({mass: 1, material: vehicleMaterial});
        const q = new CANNON.Quaternion();
        q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
        body.addShape(shape, new CANNON.Vec3(), q);
        body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1,0),90 * Math.PI/180);
        wheelBodies.push(body);
        // wheel visual body
        const geometry12 = new THREE.CylinderGeometry( wheel.radius, wheel.radius, 0.4, 32 );
        const material = new THREE.MeshPhongMaterial({
          color: 0xd0901d,
          emissive: 0xaa0000,
          side: THREE.DoubleSide,
          flatShading: true,
        });
        const cylinder = new THREE.Mesh(geometry12, material);
        cylinder.castShadow = true;
        cylinder.geometry.rotateZ(Math.PI/2);

        OBJ_LOADER.load('./wheel.obj', (object) => {
          object.scale.x = 0.5;
          object.scale.y = 0.5;
          object.scale.z = 0.5;
          object.rotation.z = -Math.PI / 2;

          cylinder.add(object)
        });
        
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

    return {
        vehicle,
        vehicleBody,
        vehicleMesh
    }
  
}