var budo = require('budo')
var babelify = require('babelify')

budo('demo/index.js', {
  live: true,             // setup live reload
  port: 8000,             // use this port
  dir: [".", "src"],
  watchGlob: './{src,demo}/**/*.{html,css}',
  open: true,
  browserify: {
    transform: babelify   // ES6
  }
}).on('connect', function (ev) {
  console.log('Server running on %s', ev.uri)
  console.log('LiveReload running on port %s', ev.livePort)
}).on('update', function (buffer) {
  console.log('bundle - %d bytes', buffer.length)
})
