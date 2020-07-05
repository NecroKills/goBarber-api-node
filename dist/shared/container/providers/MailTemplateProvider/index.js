"use strict";

var _tsyringe = require("tsyringe");

var _HandlebarsMailTemplateProvider = _interopRequireDefault(require("./implementations/HandlebarsMailTemplateProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  Handlebars: _HandlebarsMailTemplateProvider.default
}; // Foi feito diferente, pois com o Singleton não estava disparando o constructor
// Criou uma instancia e com isso vai continuar executando apenas uma vez.

_tsyringe.container.registerSingleton('MailTemplateProvider', providers.Handlebars);