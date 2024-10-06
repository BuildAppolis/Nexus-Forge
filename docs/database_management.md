
# Database Management Guide

This guide outlines the steps to properly manage your database using Prisma with the current project setup.

## Table of Contents

- [Database Management Guide](#database-management-guide)
  - [Table of Contents](#table-of-contents)
  - [Pushing Changes](#pushing-changes)
  - [Pulling Changes](#pulling-changes)
  - [Migrating the Database](#migrating-the-database)
  - [Additional Database Operations](#additional-database-operations)
  - [Best Practices](#best-practices)

## Pushing Changes

When you've made changes to your Prisma schema and want to update your database:

1. Ensure your schema changes are saved in the `schema.prisma` file.
2. Run the following command:
   ```
   pnpm db:push
   ```
3. This command will update your database schema without creating migrations.

**Note**: Use this for development purposes or when you don't need to track schema changes.

## Pulling Changes

If your database schema has been modified externally and you need to update your Prisma schema:

1. Run the following command:
   ```
   pnpm db:pull
   ```
2. This will update your `schema.prisma` file to match the current state of your database.
3. Review the changes in your `schema.prisma` file and make any necessary adjustments.

## Migrating the Database

For production environments or when you need to track schema changes:

1. Create a new migration:
   ```
   pnpm db:migrate:dev
   ```
   This command will prompt you to name your migration.

2. Review the generated migration file in the `prisma/migrations` directory.

3. To apply migrations in a production environment:
   ```
   pnpm db:migrate:deploy
   ```

4. If you need to reset your database and reapply all migrations:
   ```
   pnpm db:migrate:reset
   ```
   **Caution**: This will delete all data in your database.

## Additional Database Operations

- Generate Prisma Client:
  ```
  pnpm db:generate
  ```
  Run this after changes to your schema to update the Prisma Client.

- Seed the Database:
  ```
  pnpm db:seed
  ```
  This will populate your database with sample data defined in `prisma/seed.tsx`.

- Open Prisma Studio:
  ```
  pnpm db:studio
  ```
  This opens a visual interface to view and edit your database data.

## Best Practices

1. Always backup your database before applying migrations in production.
2. Use `db:push` for rapid iterations in development.
3. Use migrations (`db:migrate:dev` and `db:migrate:deploy`) for production and when you need to track schema changes.
4. Regularly commit your migration files to version control.
5. Test migrations on a staging environment before applying to production.

By following these steps and best practices, you can effectively manage your database schema and data throughout your development process.