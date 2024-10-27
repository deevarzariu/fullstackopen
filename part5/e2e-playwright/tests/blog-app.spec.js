const { test, expect, beforeEach, describe } = require("@playwright/test");
const { login, createBlog } = require("./helper");

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
      await login(page, "root", "1234");

      await expect(page.getByText("default-user logged in.")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await login(page, "root", "12");

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
      await login(page, "root", "1234");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(
        page,
        "blog title",
        "Blog Author",
        "https://www.google.com"
      );

      await expect(page.getByTestId("blog-heading")).toContainText(
        "blog title Blog Author"
      );
    });

    test("a blog can be liked", async ({ page }) => {
      await createBlog(
        page,
        "blog title",
        "Blog Author",
        "https://www.google.com"
      );

      await page.getByRole("button", { name: "show" }).click();
      await expect(page.getByTestId("likes")).toContainText("likes 0");

      await page.getByRole("button", { name: "like" }).click();
      await expect(page.getByTestId("likes")).toContainText("likes 1");
    });

    test("a blog can be deleted by the user that created it", async ({
      page,
    }) => {
      await createBlog(
        page,
        "blog title",
        "Blog Author",
        "https://www.google.com"
      );

      await expect(page.getByTestId("blog-heading")).toContainText(
        "blog title Blog Author"
      );
      page.on("dialog", (dialog) => dialog.accept());

      await page.getByRole("button", { name: "show" });
      await page.getByRole("button", { name: "remove" });

      await expect(page.getByTestId("blog-heading")).toContainText(
        "blog title Blog Author"
      );
    });

    test("only the creator of a blog can see its delete button", async ({
      page,
      request,
    }) => {
      await createBlog(
        page,
        "blog title",
        "Blog Author",
        "https://www.google.com"
      );
      await page.getByRole("button", { name: "logout" }).click();

      await request.post("http:localhost:3003/api/users", {
        data: {
          username: "another-one",
          name: "other-user",
          password: "12345",
        },
      });
      await login(page, "another-one", "12345");

      await page.getByRole("button", { name: "show" });
      await expect(page.getByRole("button", { name: "remove" })).toBeHidden();
    });

    test.only("blogs are arranged in the order according to the likes, the blog with the most likes first", async ({
      page,
    }) => {
      // this test might be a little slow
      test.slow();

      await createBlog(page, "title 1", "Author 1", "www.google1.com");
      await page.getByText("title 1 Author 1").waitFor();

      await createBlog(page, "title 2", "Author 2", "www.google2.com");
      await page.getByText("title 2 Author 2").waitFor();

      await createBlog(page, "title 3", "Author 3", "www.google3.com");
      await page.getByText("title 3 Author 3").waitFor();

      await page
        .getByText("title 1 Author 1")
        .getByRole("button", { name: "show" })
        .click();

      await page
        .getByText("title 2 Author 2")
        .getByRole("button", { name: "show" })
        .click();

      await page
        .getByText("title 3 Author 3")
        .getByRole("button", { name: "show" })
        .click();

      const likeBtns = await page.getByRole("button", { name: "like" }).all();

      // title 1 has 0 likes, title 2 has 2 likes, title 3 has 1 like
      await likeBtns[1].click();
      await likeBtns[1].click();
      await likeBtns[2].click();

      // by order of likes, we should display blog 2, blog 3, blog 1
      const titles = await page.getByTestId("blog-heading").all();
      await expect(titles[0]).toContainText("title 2 Author 2");
      await expect(titles[1]).toContainText("title 3 Author 3");
      await expect(titles[2]).toContainText("title 1 Author 1");
    });
  });
});
