const dgram = require('dgram')

// IP address and port on the physical machine that Dasboard is running on
// Can not be localhost or 127.0.0.1 as that points back to the docker instance
const dashboardhost = '172.21.0.121'
const dashboardport = 12345

// Setup the connection to use
var dashboard = dgram.createSocket('udp4')

// Example parameters to send
var controlObject = {
  Vu1L: 0,
  Vu1R: 0
}

// Convert the array of parameters to json and send via UDP.
function sendParameters () {
  var sendJson = JSON.stringify(controlObject)
  dashboard.send(sendJson, 0, sendJson.length, dashboardport, dashboardhost, function (err, bytes) {
    if (err) throw err
  })
}

// Generate random test values
function generateTestData () {
  controlObject.Vu1L = Math.floor(Math.random() * 100)
  controlObject.Vu1R = Math.floor(Math.random() * 100)
}

// Run function to send Parameters at a set interval
setInterval(sendParameters, 40)

// Run function to generate test data at a set interval
setInterval(generateTestData, 40)
