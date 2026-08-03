import { useEffect, useState } from "react";
import { getHealth, type HealthResponse } from "./api/healthApi";

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getHealth()
      .then(setHealth)
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) {
    return <p>Backend error: {error}</p>;
  }

  if (!health) {
    return <p>Checking backend...</p>;
  }

  return (
    <main>
      <h1>Family Finance Dashboard</h1>
      <p>Backend status: {health.status}</p>
      <p>API version: {health.version}</p>
    </main>
  );
}

export default App;