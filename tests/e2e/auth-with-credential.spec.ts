import { PrismaClient } from '@prisma/client';
import { test, expect } from "@playwright/test";
import { extractLastCode, testUser } from "./utils";
import { readFileSync } from "fs";

const prisma = new PrismaClient();

test.beforeAll(async () => {
  await prisma.user.deleteMany({
    where: {
      email: testUser.email
    }
  }).catch((error) => {
    console.error(error);
  });
});

test.afterAll(async () => {
  await prisma.$disconnect();
});

test.describe("signup and login", () => {
  test("signup", async ({ page }) => {
    await page.goto("/");
    await page.getByText("login").click();
    await page.getByText(/sign up/i).click();
    await page.waitForURL("/signup");
    await page.getByLabel("Email").fill(testUser.email);
    await page.getByLabel("Password").fill(testUser.password);
    await page.getByLabel("submit-btn").click();
    await page.waitForURL("/verify-email");
    const data = readFileSync("application.log", { encoding: "utf-8" });
    const code = extractLastCode(data);
    expect(code).not.toBeNull();
    await page.getByLabel("Verification Code").fill(code!);
    await page.getByLabel("submit-btn").click();
    await page.waitForURL("/dashboard");

    // Verify user was created in the database
    const user = await prisma.user.findUnique({
      where: { email: testUser.email }
    });
    expect(user).not.toBeNull();
    expect(user?.emailVerified).toBe(true);
  });

  test("login and logout", async ({ page }) => {
    await page.goto("/");
    await page.getByText("login").click();
    await page.getByLabel("Email").fill(testUser.email);
    await page.getByLabel("Password").fill(testUser.password);
    await page.getByLabel("submit-btn").click();
    await page.waitForURL("/dashboard");
    await page.getByAltText("Avatar").click();
    await page.getByText("Sign out").click();
    await page.getByText("Continue").click();
    await page.waitForURL("/");

    // Verify session was deleted from the database
    const session = await prisma.session.findFirst({
      where: { user: { email: testUser.email } }
    });
    expect(session).toBeNull();
  });
});