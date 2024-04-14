
import { expect, test } from "@playwright/test";
import DiscountsRequest from "@requests/discounts.requests";
import { getBaseParameters } from "@entities/baseParameters";
import { Statuses } from "@libs/statuses";

test.describe("API-тесты на получение списка акций", async () => {
    test("[positive] получить список акций", async ({ request }) => {

        const response = await new DiscountsRequest(request).getDiscounts(200, await getBaseParameters());

        await test.step("Проверить статус ответа", async () => {
            expect(response.status()).toEqual(Statuses.OK);
        });
    });
});