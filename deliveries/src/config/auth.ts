const {
	env: { SECRET_TOKEN },
} = process;

export default {
	secretToken: SECRET_TOKEN,
	expiresIn: '1d',
};
