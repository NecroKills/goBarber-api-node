import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';
import S3SStorageProvider from '@shared/container/providers/StorageProvider/implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3SStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
