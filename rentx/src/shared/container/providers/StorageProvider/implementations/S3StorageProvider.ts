import { S3 } from 'aws-sdk';
import fs from 'fs';
import mime from 'mime';
import { resolve } from 'path';

import upload from '@config/upload';
import { IStorageProvider } from '@shared/container/providers/StorageProvider';

const {
	env: { AWS_BUCKET_REGION, AWS_BUCKET },
} = process;

class S3StorageProvider implements IStorageProvider {
	constructor(
		private client: S3 = new S3({
			region: AWS_BUCKET_REGION,
		})
	) {}

	async save(file: string, folder: string): Promise<string> {
		const originalFileName = resolve(upload.tmpFolder, file);

		const fileContent = await fs.promises.readFile(originalFileName);

		const ContentType = mime.getType(originalFileName);

		await this.client
			.putObject({
				Bucket: `${AWS_BUCKET}/${folder}`,
				Key: file,
				ACL: 'public-read',
				Body: fileContent,
				ContentType,
			})
			.promise();

		await fs.promises.unlink(originalFileName);

		return file;
	}
	async delete(file: string, folder: string): Promise<void> {
		await this.client
			.deleteObject({
				Bucket: `${AWS_BUCKET}/${folder}`,
				Key: file,
			})
			.promise();
	}
}

export { S3StorageProvider };
