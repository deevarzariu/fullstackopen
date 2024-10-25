const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("log in to application")).toBeVisible();
    await expect(page.getByTestId("username")).toBeVisible();
    await expect(page.getByTestId("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "log in" })).toBeVisible();
  });

  describe("Login", () => {
    beforeEach(async ({ page, request }) => {
      await request.post("http:localhost:3003/api/testing/reset");
      await request.post("http:localhost:3003/api/users", {
        data: {
          username: "root",
          name: "default-user",
          password: "1234",
        },
      });

      await page.goto("http://localhost:5173");
    });

    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("username").fill("root");
      await page.getByTestId("password").fill("1234");
      await page.getByRole("button", { name: "log in" }).click();

      await expect(page.getByText("default-user logged in.")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username").fill("root");
      await page.getByTestId("password").fill("12");
      await page.getByRole("button", { name: "log in" }).click();

      const errorEl = await page.locator(".error");
      await expect(errorEl).toContainText("invalid password");
      await expect(errorEl).toHaveCSS("border-style", "solid");
      await expect(errorEl).toHaveCSS("color", "rgb(255, 0, 0)");

      await expect(page.getByText("default-user logged in.")).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page, request }) => {
      await request.post("http:localhost:3003/api/testing/reset");
      await request.post("http:localhost:3003/api/users", {
        data: {
          username: "root",
          name: "default-user",
          password: "1234",
        },
      });

      await page.goto("http://localhost:5173");
      await page.getByTestId("username").fill("root");
      await page.getByTestId("password").fill("1234");
      await page.getByRole("button", { name: "log in" }).click();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "new blog" }).click();
      await page.getByTestId("title").fill("blog title");
      await page.getByTestId("author").fill("Blog Author");
      await page.getByTestId("url").fill("https://www.google.com");
      await page.getByRole("button", { name: "create" }).click();

      await expect(page.getByTestId("blog-heading")).toContainText(
        "blog title Blog Author"
      );
    });

    test("a blog can be liked", async ({ page }) => {
      await page.getByRole("button", { name: "new blog" }).click();
      await page.getByTestId("title").fill("blog title");
      await page.getByTestId("author").fill("Blog Author");
      await page.getByTestId("url").fill("https://www.google.com");
      await page.getByRole("button", { name: "create" }).click();

      // the like button is in the details section of the blog
      await page.getByRole("button", { name: "show" }).click();
      // show that post has initially zero likes
      await expect(page.getByTestId("likes")).toContainText("likes 0");

      await page.getByRole("button", { name: "like" }).click();
      // show that the number of likes gets updated
      await expect(page.getByTestId("likes")).toContainText("likes 1");
    });
  });
});
