# CTP Installation Prototype
This app is part of a final year project for [Digital Media at UWE](https://my.uwe.ac.uk/) in context with the Creative Technologies module. This consists of a prototype that uses body input to control sound, built to run in the browser.

The project uses [poseNet's machine learning model](https://github.com/tensorflow/tfjs-models/tree/master/posenet) and draws a skeleton representation of detected poses using [p5js](https://p5js.org/). The front end of the application is built with [React](https://reactjs.org/).

## Setup
```
npm install
npm start
```

## Build
1. Set `homepage` path at `package.json`
2. Run `npm run build`

## Commits
This project uses husky and prettier so there might be errors when commiting.
Please run `npm run fix-formatting` before commiting in order to prevent errors.
