#!/usr/bin/env bash

rm -rf flats/*
./node_modules/.bin/truffle-flattener contracts/WeatherToken.sol > flats/WeatherToken_flat.sol

./node_modules/.bin/truffle-flattener contracts/WeatherCrowdsale.sol > flats/WeatherCrowdsale_flat.sol