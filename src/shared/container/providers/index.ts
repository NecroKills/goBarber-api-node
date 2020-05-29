import { container } from 'tsyringe';
// import '@shared/container/providers/MailProvider';
import '@shared/container/providers/StorageProvider';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import EherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailProvider,
);

// Foi feito diferente, pois com o Singleton não estava disparando o constructor
// Criou uma instancia e com isso vai continuar executando apenas uma vez.
container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EherealMailProvider),
);
