"use strict";

var _tsyringe = require("tsyringe");

var _mail = _interopRequireDefault(require("../../../../config/mail"));

var _EtherealMailProvider = _interopRequireDefault(require("./implementations/EtherealMailProvider"));

var _SESMailProvider = _interopRequireDefault(require("./implementations/SESMailProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  ethereal: _tsyringe.container.resolve(_EtherealMailProvider.default),
  ses: _tsyringe.container.resolve(_SESMailProvider.default)
}; // Foi feito diferente, pois com o Singleton não estava disparando o constructor
// Criou uma instancia e com isso vai continuar executando apenas uma vez.

_tsyringe.container.registerInstance('MailProvider', providers[_mail.default.driver]);