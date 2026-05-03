type Course = {
  id: number;
  name: string;
  duration: number;
  description: string;
  price: number;
  created_at: string;
  updated_at: string;
  thumbnail_url: string;
}

export const CoursesMock = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Course ${i + 1}`,
  duration: 20 + i,
  description: "Sample course description for UI testing purposes.",
  price: 300000 + i * 100000,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  thumbnail_url: `https://picsum.photos/seed/course${i}/400/250`,
}));