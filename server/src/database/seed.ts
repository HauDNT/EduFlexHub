import dataSource from '@/database/data-source';
import { seedCourses } from '@/database/seeds/course.seed';

async function runSeed() {
  await dataSource.initialize();

  console.log("Starting seed...");

  // Seed Courses:
  await seedCourses(dataSource);

  console.log('Seeding completed!');

  await dataSource.destroy();
}

runSeed();