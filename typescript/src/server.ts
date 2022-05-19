import express from 'express';
import { createCourse } from './routes';

const app = express();

app.get('/', createCourse);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
