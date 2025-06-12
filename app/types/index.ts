// User type to match Prisma schema when client is not generated
export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  provider: string;
  providerId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

// Todo type to match Prisma schema when client is not generated
export interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  userId: string;
}
