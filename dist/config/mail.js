"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'maycondasilvamoreira@hotmail.com',
      name: 'maycon da silva'
    }
  }
};
exports.default = _default;