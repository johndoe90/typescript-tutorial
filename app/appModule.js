/// <reference path="_reference.ts" />
define(["require", "exports", 'angular', './testController'], function (require, exports, angular, testController_1) {
    angular
        .module('typescript', [])
        .controller('testController', testController_1.TestController)
        .config(function () {
        console.log('CONFIGURATION');
    });
});
