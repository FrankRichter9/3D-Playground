export function initButtonControls(vehicle) {
    window.addEventListener('keydown', (e) => navigate(e, vehicle))
    window.addEventListener('keyup', (e) => navigate(e, vehicle))
}

function navigate(e, vehicle) {
    if (e.type != 'keydown' && e.type != 'keyup') return;
    var keyup = e.type == 'keyup';

    const s = 0
    vehicle.setBrake(s, 0);
    vehicle.setBrake(s, 1);
    vehicle.setBrake(s, 2);
    vehicle.setBrake(s, 3);
  
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