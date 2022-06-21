import { app } from '.';

const {
	env: { PORT },
} = process;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
