import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../../api/usersApi";

export function UserList() {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (usersQuery.isPending) {
    return <p>Loading users...</p>;
  }

  if (usersQuery.isError) {
    return (
      <section>
        <h2>Users</h2>

        <p role="alert">
          {usersQuery.error instanceof Error
            ? usersQuery.error.message
            : "Unable to load users."}
        </p>

        <button type="button" onClick={() => usersQuery.refetch()}>
          Try again
        </button>
      </section>
    );
  }

  if (usersQuery.data.length === 0) {
    return (
      <section>
        <h2>Users</h2>
        <p>No users have been created yet.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Created</th>
          </tr>
        </thead>

        <tbody>
          {usersQuery.data.map((user) => (
            <tr key={user.id}>
              <td>
                {user.firstName} {user.lastName}
              </td>

              <td>{user.email}</td>

              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
