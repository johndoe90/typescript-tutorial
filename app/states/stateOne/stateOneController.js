/**
 * Created by johndoe on 25.05.15.
 */
'use strict';
define(["require", "exports"], function (require, exports) {
    var StateOneController = (function () {
        function StateOneController(greeterService) {
            this.greeterService = greeterService;
        }
        StateOneController.prototype.greet = function () {
            return this.greeterService.greet(this.name);
        };
        StateOneController.$inject = ['greeterService'];
        return StateOneController;
    })();
    exports.StateOneController = StateOneController;
});
//# sourceMappingURL=stateOneController.js.map