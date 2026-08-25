import { test, expect } from "@playwright/test";

test("loads the quiz and shows the first question", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Question 1 / 10")).toBeVisible();
  await expect(page.getByTestId("answer-button")).toHaveCount(5);
});

test("answering all 10 questions reveals a result", async ({ page }) => {
  await page.goto("/");

  for (let i = 0; i < 10; i++) {
    await page.getByTestId("answer-button").first().click();
  }

  await expect(page.getByText("Your Result")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Bold Adventurer" })
  ).toBeVisible();
  await expect(page.getByText("Double Espresso")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Take it again" })
  ).toBeVisible();
});

test("Take it again resets the quiz back to question 1", async ({ page }) => {
  await page.goto("/");

  for (let i = 0; i < 10; i++) {
    await page.getByTestId("answer-button").first().click();
  }

  await page.getByRole("button", { name: "Take it again" }).click();

  await expect(page.getByText("Question 1 / 10")).toBeVisible();
});
