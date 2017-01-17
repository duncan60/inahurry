#!/bin/bash
npm install
npm run webpackDeploy
npm install forever -g
forever start -c 'npm run server'
