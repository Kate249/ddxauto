import { expect, test } from "@playwright/test";
import api from '../../../api.json'
import { getBaseParameters } from "@entities/baseParameters";

test.describe("API-тесты на получение списка клубов", async () => {
    test("[positive] получить список клубов", async ({ request }) => {
       const response = await request.get(
        `${api.urls.base_url_api}${api.paths.clubs}`,
        {
            headers: {
                'Authorization': `${api.tokens.test}`
            },
            params: {...await getBaseParameters()}   
        }
       );
       expect(response.status()).toEqual(200);
    });

    test("[negative] получить список клубов", async ({ request }) => {
        const response = await request.get(
         `${api.urls.base_url_api}${api.paths.clubs}`,
         {
             headers: {
                 'Authorization': `${api.tokens.test}`
             },
             params:{...await getBaseParameters(), request_source: ''} 
         }
        );
        expect(response.status()).not.toEqual(200);
    });
});