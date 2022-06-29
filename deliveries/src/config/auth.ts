const {
	env: { CLIENT_SECRET_TOKEN, DELIVERYMAN_SECRET_TOKEN },
} = process;

export default {
	clientSecretToken: CLIENT_SECRET_TOKEN,
	deliverymanSecretToken: DELIVERYMAN_SECRET_TOKEN,
	expiresIn: '1d',
};
