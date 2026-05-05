export const CoursesMock = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Course ${i + 1}`,
  duration: 20 + i,
  description: "Sample course description for UI testing purposes.",
  price: 300000 + i * 100000,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  thumbnail_url: `https://picsum.photos/seed/course${i}/400/250`,
}));