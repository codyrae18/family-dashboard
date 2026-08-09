import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createUser } from "../../api/usersApi";
import type { CreateUserRequest } from "../../types/user";

const initialForm: CreateUserRequest = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export function CreateUserForm() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<CreateUserRequest>(initialForm);

  const createUserMutation = useMutation({
    mutationFn: createUser,

    onSuccess: async () => {
      setForm(initialForm);

      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    createUserMutation.mutate({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create user</h2>

      <div>
        <label htmlFor="firstName">First name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={form.firstName}
          onChange={(event) =>
            setForm({
              ...form,
              firstName: event.target.value,
            })
          }
          required
          maxLength={100}
        />
      </div>

      <div>
        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={form.lastName}
          onChange={(event) =>
            setForm({
              ...form,
              lastName: event.target.value,
            })
          }
          required
          maxLength={100}
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={(event) =>
            setForm({
              ...form,
              email: event.target.value,
            })
          }
          required
          maxLength={255}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={(event) =>
            setForm({
              ...form,
              password: event.target.value,
            })
          }
          required
          minLength={8}
        />
      </div>

      <button type="submit" disabled={createUserMutation.isPending}>
        {createUserMutation.isPending ? "Creating..." : "Create user"}
      </button>

      {createUserMutation.isSuccess && (
        <p role="status">User created successfully.</p>
      )}

      {createUserMutation.isError && (
        <p role="alert">
          {createUserMutation.error instanceof Error
            ? createUserMutation.error.message
            : "Unable to create the user."}
        </p>
      )}
    </form>
  );
}
