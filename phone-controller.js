// note: this is the start of the program
$("#output").html('in program');

$("#startButton").click(start);

function start() {
  $("#output").html('starting');
  var Drone = require('parrot-minidrone');
  var drone = new Drone({
      autoconnect: true,
  });

  drone.on('connected', () => drone.takeOff());
  drone.on('flightStatusChange', (status) => {
      if (status === 'hovering') {
          console.log("detected hover");
          drone.land();
          process.exit();
      }
  });

  setTimeout(function() {
    console.log("timed out");
    drone.land();
    process.exit();
  }, 15000);
}

// react to changes in device orientation
// $("#output").html('script loaded');
// let state = 'landed';
//
// window.ondeviceorientation = function(event) {
//   // adjust raw values so the device starts out in the middle of the range
//   let yaw = 0;
//   let pitch = 0;
//   let roll = 0;
//
//   let alpha = (event.alpha + 180) % 360 - 180;
//   let beta = (event.beta + 180) % 360 - 180;
//   let gamma = event.gamma;
//
//   if (Math.abs(alpha) > 10) {
//     yaw = alpha;
//   };
//   if (Math.abs(beta) > 10) {
//     pitch = beta;
//   };
//   if (Math.abs(gamma) > 10) {
//     roll = gamma;
//   };
//
//   if (state === 'flying' & yaw === 0 & pitch === 0 & roll === 0) {
//     //$("#output").html('pause');
//   } else if (state === 'flying'){
//     $("#output").html('y: '+yaw+' p: '+pitch+' r: '+roll);
//   };
// };
//
// window.ondevicemotion = function(event) {
//   if (event.acceleration.z > 3 && state === 'landed') {
//     $("#output").html('going up');
//     state = 'flying';
//   } else if (event.acceleration.z < -3 && state === 'flying') {
//     $("#output").html('going down');
//     state = 'landed';
//   };
// };
