import { Request, Response } from 'express';
import { CreateCourseService } from './CreateCourseService';

function createCourse(request: Request, response: Response) {
  const createCourseService = new CreateCourseService();

  createCourseService.execute({
    educator: 'Dani',
    name: 'Node.js',
    duration: 10,
  });

  return response.send();
}

export { createCourse };
