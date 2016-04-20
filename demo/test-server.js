var budo          = require('budo'),
    babelify      = require('babelify'),
    childprocess  = require('child_process'),
    selenium      = require('selenium-server-standalone-jar'),
    ansi          = require('ansi') ,
    Logger        = require('nightwatch/lib/util/logger.js'),
    Nightwatch    = require('nightwatch/lib/index.js'),
    Runner        = require('nightwatch/lib/runner/run.js'),
    cursor        = ansi(process.stdout),
    seleniumReady = false,
    serverReady   = false;


function finished() {
  console.log('Test finished, shutting down!');
  process.exit(0);
}

function isReady() {
  return seleniumReady && serverReady;
}

function notReady() {
  return !isReady();
}

function launchNightwatch() {
  if(notReady()) return;

  Runner.run(source, this.test_settings, {
    output_folder : this.output_folder,
    src_folders : this.settings.src_folders,
    live_output : this.settings.live_output,
    start_session: this.startSession,
    reporter : this.argv.reporter,
    testcase : this.argv.testcase,
    end_session_on_fail : this.endSessionOnFail,
    retries : this.argv.retries,
    suite_retries : this.argv.suiteRetries
  }, finished);
}

// Start Selenium Server
var child = childprocess.spawn('java', ['-jar', selenium.path]);
child.stdout.on('data', function(data) {
  data.toString().split("\n").forEach(function(line) {
    if(line.trim().length > 0) {
      cursor
        .white().bg.green().write('SELENIUM STDOUT:').reset()
        .white().write('\t').write(line).write('\n').reset();
    }

    if(!seleniumReady && line.includes('running')) {
      seleniumReady = true;
      launchNightwatch();
    }
  });
});

child.stderr.on('data', function(data) {
  data.toString().split("\n").forEach(function(line) {
    if(line.trim().length > 0) {
      cursor
        .white().bg.red().write('SELENIUM STDERR:').reset()
        .white().write('\t').write(line).write('\n').reset();
    }

    if(!seleniumReady && line.includes('running')) {
      seleniumReady = true;
      launchNightwatch();
    }
  });
});

child.on('close', function(code) {
  console.log('SELENIUM: Shutting down!');
});

// Webserver and Browserify Bundling Setup
budo('demo/index.js', {
  live: false,             // no setup live reload!
  port: 8001,             // use this port
  dir: [".", "src"],
  watchGlob: './{src,demo}/**/*.{html,css}',
  open: false,
  browserify: {
    transform: babelify   // ES6
  }
}).on('connect', function (ev) {
  console.log('Server running on %s', ev.uri);
  serverReady = true;
  launchNightwatch();
}).on('update', function (buffer) {
  console.log('bundle - %d bytes', buffer.length);
});

Nightwatch.on('nightwatch:finished', function(e) {

});
