"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_check = /** @class */ (function () {
    function auth_check() {
    }
    auth_check.user = function (token) {
        return true;
    };
    return auth_check;
}());
exports.default = auth_check;
