import express from 'express';

import { categoriesRoutes, specificationsRoutes } from './routes';

const app = express();

app.use(express.json());

app.use('/categories', categoriesRoutes);
app.use('/specifications', specificationsRoutes);

const PORT = 3333;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
