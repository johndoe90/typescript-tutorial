/// <reference path="./../../references.ts" />
/**
 * Created by johndoe on 25.05.15.
 */
'use strict';
define(["require", "exports", 'angular', './greeterService'], function (require, exports, angular, greeterService_1) {
    exports.greeterModule = angular
        .module('greeter', [])
        .service('greeterService', greeterService_1.GreeterService);
});
//# sourceMappingURL=greeterModule.js.map