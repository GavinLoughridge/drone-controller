const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


const Drone = require('parrot-minidrone');
const drone = new Drone({
    autoconnect: true,
});

drone.on('connected', () => drone.takeOff());

setTimeout(function() {
  console.log("timed out");
  drone.land();
}, 5000);

function pause() {
  drone.setFlightParams({
    roll: 0,
    pitch: 0,
    yaw: 0,
    altitude: 0
  });
  return new Promise(resolve => setTimeout(resolve, 3500));
}

function setParams(obj, duration) {
  drone.setFlightParams(obj);
  return new Promise(resolve => setTimeout(resolve, duration));
}

app.get('/', (req, res) => {
  res.render('index');
})

io.on('connection', function(socket){
  console.log('connected')

  socket.on('takeoff', (message) => {
    console.log('taking off');
    drone.takeOff()
  });

  socket.on('land', (message) => {
    console.log('landing');
    drone.land();
  });

  socket.on('pause', async (message) => {
    console.log('pausing');
    await pause();
  });

  socket.on('fly', async (message) => {
    console.log('setting params:', message);
    await setParams(message, 1000);
  });
});

http.listen(port, function(){
  console.log('Example app listening on port ' + port);
});
