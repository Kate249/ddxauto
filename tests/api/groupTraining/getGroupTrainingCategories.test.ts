import { expect, test } from "@playwright/test";
import { getBaseParameters } from "@entities/baseParameters";
import GroupTrainingCategoriesRequests from "@requests/groupTrainingCategories";
import { Statuses } from "@libs/statuses";


test.describe("API-тесты на получение категорий групповых тренировок", async () => {
    test("[positive] получить категории групповых тренировок", async ({ request }) => {
        const response = await new GroupTrainingCategoriesRequests(request).getGroupTrainingCategories(200, await getBaseParameters());

        await test.step("Проверить статус ответа", async () => {
            expect(response.status()).toEqual(Statuses.OK);
        });
    });
});