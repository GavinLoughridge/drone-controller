const Drone = require('parrot-minidrone');
const drone = new Drone({
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
