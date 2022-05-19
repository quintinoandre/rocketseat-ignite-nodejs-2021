import express from 'express';

import { categoriesRoutes } from './routes/categories.routes';

const app = express();

app.use(express.json());

app.use(categoriesRoutes);

const PORT = 3333;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
