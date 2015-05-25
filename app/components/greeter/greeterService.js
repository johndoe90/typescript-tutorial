/**
 * Created by johndoe on 25.05.15.
 */
'use strict';
define(["require", "exports"], function (require, exports) {
    var GreeterService = (function () {
        function GreeterService() {
        }
        GreeterService.prototype.greet = function (name) {
            var greeting = 'Hello, ' + name + '!';
            console.log(greeting);
            return greeting;
        };
        return GreeterService;
    })();
    exports.GreeterService = GreeterService;
});
//# sourceMappingURL=greeterService.js.map