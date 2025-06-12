/**
 * Prismaクライアントが生成されていない場合のPrismaスキーマに対応するユーザー型
 */
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

/**
 * Prismaクライアントが生成されていない場合のPrismaスキーマに対応するTodo型
 */
export interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  userId: string;
}
