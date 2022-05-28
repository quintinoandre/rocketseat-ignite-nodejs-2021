interface IAuthenticateUserRequestDTO {
	email: string;
	password: string;
}

interface IAuthenticateUserResponseDTO {
	user: {
		name: string;
		email: string;
	};
	token: string;
}

export { IAuthenticateUserRequestDTO, IAuthenticateUserResponseDTO };
