// Imports
'use strict';
const Readline = require('readline');
const VERSION = '16.5.5';
const ControlServer = require('./core/ControlServer');
let controlServer = new ControlServer(VERSION);
//throw error
// Init variables
let showConsole = true;

// Handle arguments
process.argv.forEach(function (val) {
  if (val == "--noconsole") {
    showConsole = false;
  } else if (val == "--help") {
    console.log("Proper Usage: node index.js");
    console.log("    --noconsole         Disables the console");
    console.log("    --help              Help menu.");
    console.log("    --expose-gc         Enables garbage collection")
    console.log("");
  }
});
if (global.gc) {
    global.gc();
} else {
    console.log('Garbage collection unavailable.  Pass --expose-gc '
      + 'when launching node to enable garbage collection.(memory leak)');
}

// There is no stopping an exit so clean up
// NO ASYNC CODE HERE - only use SYNC or it will not happen
process.on('exit', (code) => {
  console.log("OgarUnlimited terminated with code: " + code);
  controlServer.stop();
});

// init/start the control server
controlServer.init();
setTimeout(function() {controlServer.start()},1500);

// Initialize the server console
if (showConsole) {
  let streamsInterface = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  setTimeout(controlServer.getConsoleService().prompt(streamsInterface), 100);
}
