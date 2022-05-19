interface ICourse {
  name: string;
  duration: number;
  educator: string;
}

class CreateCourseService {
  execute(data: ICourse) {
    console.log(data.name, data.duration, data.educator);
  }
}

export { CreateCourseService };
