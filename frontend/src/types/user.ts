export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
}