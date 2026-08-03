export type HealthResponse = {
  status: string;
  version: string;
};

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch("/api/health");

  if (!response.ok) {
    throw new Error("Unable to connect to the backend");
  }

  return response.json();
}