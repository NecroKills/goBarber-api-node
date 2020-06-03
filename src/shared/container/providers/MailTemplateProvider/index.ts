import { container } from 'tsyringe';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

const providers = {
  Handlebars: HandlebarsMailTemplateProvider,
};

// Foi feito diferente, pois com o Singleton não estava disparando o constructor
// Criou uma instancia e com isso vai continuar executando apenas uma vez.
container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.Handlebars,
);
