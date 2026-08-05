THIS Page is still in progress

## Frontend 
We are using React and Tailwind with our front end structure.

## Backend

## Database migrations

Database schema changes are managed by Flyway.

Migration files are stored in:

`backend/src/main/resources/db/migration`

Use the following naming convention:

`V{version}__{description}.sql`

Examples:

- `V1__create_users_table.sql`
- `V2__create_accounts_table.sql`
- `V3__add_status_to_users.sql`

Naming rules:

- Start versioned migrations with an uppercase `V`.
- Use the next unused migration version.
- Add exactly two underscores between the version and description.
- Write descriptions in lowercase snake case.
- End the filename with `.sql`.
- Never modify a migration that has already been applied.
- Create a new migration for every subsequent schema change.

Flyway executes pending migrations in version order and records applied migrations in the `flyway_schema_history` table.