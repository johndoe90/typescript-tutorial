/// <reference path="./../../references.ts" />

/**
 * Created by johndoe on 25.05.15.
 */

'use strict';

import angular = require('angular');
import {GreeterService} from './greeterService';

export var greeterModule = angular
    .module('greeter', [])
    .service('greeterService', GreeterService);