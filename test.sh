#!/usr/bin/env bash
set -u

node demo/test-server.js --test tests/setup-test.js

# echo 'Starting up Selenium Server, see selenium.logs for output...'
# java -jar /usr/local/opt/selenium-server-standalone/libexec/selenium-server-standalone-2.53.0.jar &
# SELENIUM_PID=$!

# echo 'Starting test server...'
# npm run-script test-server &
# NPM_PID=$!
# trap "kill -2 $NPM_PID; kill -2 $SELENIUM_PID" 2
# sleep 1

# nightwatch --test tests/setup-test.js

# kill $NPM_PID
# kill $SELENIUM_PID

# wait $NPM_PID
# wait $SELENIUM_PID
