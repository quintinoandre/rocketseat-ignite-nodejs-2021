import { container } from 'tsyringe';

import {
	LocalStorageProvider,
	S3StorageProvider,
} from '@shared/container/providers/StorageProvider/implementations';

import { IStorageProvider } from '.';

export * from './IStorageProvider';

const {
	env: { DISK },
} = process;

const diskStorage = {
	LOCAL: LocalStorageProvider,
	S3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
	'StorageProvider',
	diskStorage[DISK]
);
