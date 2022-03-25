#!/usr/bin/env bash

# set -eu

# export DISPLAY=:99
# pidof Xvfb || /sbin/start-stop-daemon --start --quiet --pidfile /tmp/custom_xvfb_99.pid --make-pidfile --background --exec /usr/bin/Xvfb -- :99 -ac -screen 0 2048x1536x16

chmod -R a+rwx /webdriverio/logs
chmod -R a+rwx /webdriverio/screenshots
chmod -R a+rwx /webdriverio/allure-results
chmod -R a+rwx /webdriverio/allure-report
# npm run test

