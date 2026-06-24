const API_BASE_URL = 'https://api.codingthailand.com/api/course';

export interface Course {
  id: number;
  title: string;
  detail: string;
  picture: string;
}

export async function getCourses(): Promise<Course[]> {
  const response = await fetch(API_BASE_URL);
  const { data } = await response.json();
  return data;
}
