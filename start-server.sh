#!/bin/bash

echo restarting server
forever stopall
forever cleanlogs
killall node
forever start -w -a -l forever.log index.js
echo server restartedn