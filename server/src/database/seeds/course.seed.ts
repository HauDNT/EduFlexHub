import { DataSource } from 'typeorm';
import { Course } from '@/modules/courses/entities/course.entity';
import { courseFactory } from '@/database/factories/course.factory';
import { User } from '@/modules/users/entities/user.entity';
import { RoleEnum } from '@/database/enums';

export const seedCourses = async (
  dataSource: DataSource,
) => {
  const courseRepo = dataSource.getRepository(Course);
  const userRepo = dataSource.getRepository(User);

  const teachers = await userRepo.find({
    where: { role_id: RoleEnum.Teacher },
  });

  if (!teachers.length) {
    throw new Error('❌ Không có teacher trong DB để seed Course');
  }

  const courses: Course[] = [];

  for (let i = 0; i < 100; i++) {
    const teacher = teachers[i % teachers.length];
    courses.push(courseFactory(teacher));
  }

  return await courseRepo.save(courses);
}