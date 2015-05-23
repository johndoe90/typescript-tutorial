/// <reference path="_reference.ts" />

import angular = require('angular');

import {TestController} from './testController';

angular
	.module('typescript', [])
	.controller('testController', TestController)
	.config(function() {
		console.log('CONFIGURATION');
	});