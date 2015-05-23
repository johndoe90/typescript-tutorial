define(["require", "exports"], function (require, exports) {
    var TestController = (function () {
        function TestController() {
            console.log('Instantiate Test Controller22');
        }
        TestController.prototype.sayHello = function () {
            console.log('Controller says hi!');
        };
        return TestController;
    })();
    exports.TestController = TestController;
});
