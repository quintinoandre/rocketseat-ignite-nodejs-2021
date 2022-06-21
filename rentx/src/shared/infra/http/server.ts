import { app } from '.';

const {
	env: { PORT },
} = process;

app.listen(PORT || 3333, () => {
	console.log(`Server running on port ${PORT || 3333}`);
});
