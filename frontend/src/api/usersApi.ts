import type { CreateUserRequest, User } from "../types/user";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text();

    throw new Error(
      message || `Request failed with status ${response.status}`,
    );
  }

  return response.json() as Promise<T>;
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/api/users`);

  return handleResponse<User[]>(response);
}

export async function createUser(
  request: CreateUserRequest,
): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  return handleResponse<User>(response);
}