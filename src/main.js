var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

inherits(Flashcam, EventEmitter);
module.exports = Flashcam;

function Flashcam (opts) {
  if (!(this instanceof Flashcam)) return new Flashcam(opts);
  //this.element = document.createElement('div');
  console.log("Flashcam constructor called!");
  this.container = document.querySelector(opts.container);
}

/*
 Listen for camera start event on container element:

 ````
   container.on('webcamStart', function (target) {
     console.log('Webcam preview has started on: ' + target.outerHTML);
   });
 ````
 */
Flashcam.prototype.start = function () {
  console.log("Starting Flashcam");
  this.emit('webcamStart', this.container);
};
