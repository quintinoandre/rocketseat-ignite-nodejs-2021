import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImagesUseCase } from '.';

interface IFiles {
	filename: string;
}

class UploadCarImagesController {
	async handle(request: Request, response: Response): Promise<Response> {
		const {
			params: { id: car_id },
		} = request;

		const images = request.files as Array<IFiles>;

		const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

		const images_name = images.map((image) => image.filename);

		await uploadCarImagesUseCase.execute({ car_id, images_name });

		return response.sendStatus(201); //* status 201 - created
	}
}

export { UploadCarImagesController };
