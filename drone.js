/* Parrot minidrone!! */

// Initialize the library
var Drone = require('parrot-minidrone');
var drone = new Drone({
    autoconnect: true,
});

// positive pitch is forward, negative is backward
// duration is how long you want the drone to do this for, in milliseconds
function pitch(amount, duration) {
  drone.setFlightParams({ pitch: amount });
  return new Promise(resolve => setTimeout(resolve, duration));
}

//add functions for roll (right/left), yaw (spin) and altitude here
function roll(amount, duration) {
  drone.setFlightParams({ roll: amount });
  return new Promise(resolve => setTimeout(resolve, duration));
}

function yaw(amount, duration) {
  drone.setFlightParams({ yaw: amount });
  return new Promise(resolve => setTimeout(resolve, duration));
}

function altitude(amount, duration) {
  drone.setFlightParams({ altitude: amount });
  return new Promise(resolve => setTimeout(resolve, duration));
}

function setParams(obj, duration) {
  drone.setFlightParams(obj);
  return new Promise(resolve => setTimeout(resolve, duration));
}


// flipDirection options: flipFront, flipBack, flipRight, flipLeft
//pass in as a string ("with quotes"), the direction you want the drone to flip
function flip(flipDirection) {
  drone.animate(flipDirection);
  return new Promise((resolve) => setTimeout(resolve, 2500));
}


// Clear all flight params back to zero
function pause() {
  drone.setFlightParams({
    roll: 0,
    pitch: 0,
    yaw: 0,
    altitude: 0
  });
  return new Promise(resolve => setTimeout(resolve, 3500));
}


//YOUR FLIGHT PLAN
if (drone) {
  drone.on('connected', () => drone.takeOff());
  setTimeout(async () => {
    try {
      // Call your functions here!
      // pass in what the function is expecting, for frontBack this is pitch and duration
      console.log('change pitch');
      await pitch(66, 1000);
      await pause();

      console.log('change roll');
      await roll(30, 1000);
      await pause();

      console.log('change yaw');
      await yaw(30, 1000);
      await pause();

      console.log('change altitude');
      await altitude(30, 1000);
      await pause();

      console.log('front flip');
      await flip(flipFront);
      await pause();

      console.log('change roll, pitch, yaw, altitude');
      await setParams({
        roll: 30,
        pitch: 30,
        yaw: 30,
        altitude: 30
      }, 1000);
      await pause();

      console.log('land');
      drone.land();
      process.exit();
    }
    catch (e) {
      console.log('emergency land', e);
      drone.land();
      process.exit();
    }
  }, 6500);
}
