#!/bin/bash

echo stopping server
forever stopall
forever cleanlogs
killall node
echo server stopped 
