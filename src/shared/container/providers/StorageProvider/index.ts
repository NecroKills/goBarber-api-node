import { container } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import EherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

// Foi feito diferente pois com o Singleton naõ estava entrando no constructor
container.registerInstance<IMailProvider>(
  'EherealMailProvider',
  new EherealMailProvider(),
);
