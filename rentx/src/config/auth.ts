const {
	env: { SECRET_TOKEN, SECRET_REFRESH_TOKEN },
} = process;

export default {
	secretToken: SECRET_TOKEN,
	expiresInToken: '15m',
	secretRefreshToken: SECRET_REFRESH_TOKEN,
	expiresInRefreshToken: '30d',
	expires_refresh_token_days: 30,
};
