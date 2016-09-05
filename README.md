# Polymer ES6 Todo

[![Build status](https://travis-ci.org/LasaleFamine/polymer-es6-todo.svg?branch=master)](https://travis-ci.org/LasaleFamine/polymer-es6-todo)

:warning: ======  ***NOT READY (but it's question of details :eyes:)***  ===== :warning:

> Very simple to-do application written in Polymer (ES6) complete of unit and integration test and build process.

A support application born to be a good skeleton with all (maybe) the needed automation task within the `package.json` and handle by **NPM**.  
Basically it needs to work with Travis as integration and also in a Jenkins build process, correctly.  

Written in ES6 and transpiled with Webpack and Babel.

## Install

    $ npm install && bower install

## Run

Simply run the application on **localhost:3000**  

    $ gulp connect

Run for development (watch on all ES6 files)  

    $ gulp dev


## Test

Unit tests are written with the [web-component-tester](https://github.com/Polymer/web-component-tester) from the Polymer guys.  

Integration tests are an experiment with [Nightwatch](http://nightwatchjs.org/), [Cucumber](https://github.com/cucumber/cucumber-js) and the [nightwatch-cucumber](https://github.com/mucsi96/nightwatch-cucumber) module as handler for both.

Unit test (with WCT)  

    $ npm test

Integration test (nightwatch-cucumber)  

    $ npm run test:integration

## Build

Build will create a new folder `/dist` with all the necessary (vulcanized and minified) files.

    $ npm run build

## Note on dependencies

Good to now, I used the [clab-ui-components](https://github.com/contactlab/contactlab-ui-components) to make the UI looks nice.

## Fork (yes, please)

As an ***experimental automation app*** (and as always), forks appreciate :rocket:
