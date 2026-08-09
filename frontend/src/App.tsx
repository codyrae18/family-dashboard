import { useEffect, useState } from "react";
import { getHealth, type HealthResponse } from "./api/healthApi";
import { CreateUserForm } from "./components/users/createUserForm";
import { UserList } from "./components/users/userList";

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
      <CreateUserForm />
      <UserList />
    </main>
  );
}

export default App;
