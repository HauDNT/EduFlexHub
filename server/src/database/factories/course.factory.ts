import { faker } from '@faker-js/faker';
import { Course } from "@/modules/courses/entities/course.entity";
import { User } from "@/modules/users/entities/user.entity";

export const courseFactory = (teacher: User): Course => {
  const course = new Course();

  course.name = faker.commerce.productName();
  course.duration = `${Math.floor(Math.random() * 3) + 1}:00:00`;
  course.description = faker.lorem.paragraph();
  course.price = Number(faker.commerce.price({ min: 100, max: 1000 })) * 1000;
  course.thumbail_url = faker.image.urlPicsumPhotos({
    width: 400,
    height: 250,
  });

  course.created_at = new Date();
  course.updated_at = new Date();

  course.teacher = teacher;

  return course;
};
