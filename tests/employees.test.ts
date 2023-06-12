import { expect, test } from "@playwright/test";
import api from '../api.json';
import { getBaseParameters } from "../entities/baseParameters";

test.describe("API-тесты на получение информации о сотрудниках", async () => {
    test("[positive] получить список клубов", async ({ request }) => {
       const response = await request.get(
        `${api.urls.base_url_api}${api.paths.employees}`,
        {
            headers: {
                'Authorization': `${api.tokens.test}`
            },
            params: {...await getBaseParameters()}   
        }
       );
       expect(response.status()).toEqual(200);
    });
});