
import { expect, test } from "@playwright/test";
import { getBaseParameters } from "../../entities/baseParameters";
import { Statuses } from "@libs/statuses";
import ProductsRequest from "@requests/products.request";

test.describe.only("API-тесты на получение списка продуктов", async () => {
    test("[positive] получить список продуктов", async ({ request }) => {

        const response = await new ProductsRequest(request).getProducts(200, await getBaseParameters());

        await test.step("Проверить статус ответа", async () => {
            expect(response.status()).toEqual(Statuses.OK);
        });
    });
});