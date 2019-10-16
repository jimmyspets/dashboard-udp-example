const dgram = require('dgram')

const dashboardhost = '172.21.0.121'
const dashboardport = 12345

var dashboard = dgram.createSocket('udp4');
var controlObject = {
  "Vu1L":0,
  "Vu1R":0
}


function sendControls(){
  var sendJson = JSON.stringify(controlObject)
  dashboard.send(sendJson,0,sendJson.length, dashboardport, dashboardhost, function(err, bytes){
    if (err) throw err;
  });
}

function generateTestData(){
  controlObject["Vu1L"]= Math.floor(Math.random()*100)
  controlObject["Vu1R"]= Math.floor(Math.random()*100)
}

setInterval(sendControls,40)

setInterval(generateTestData, 40)