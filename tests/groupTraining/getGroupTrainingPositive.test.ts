import { expect, test } from "@playwright/test";
import api from '../../api.json';
import { getBaseParameters } from "../../entities/baseParameters";
import { log } from "../../utils/logger";

test.describe("Тесты на получение списка названия групповых тренировок", async () => {
    test("[positive] получить список названий групповых тренировок", async ({ request }) => {
        const url = `${api.urls.base_url_api}${api.paths.groupTrainings}`;
        const parameters = {...await getBaseParameters()};
        
        log("request url", url);
        log('request parameters', parameters);
        const response = await request.get(
        url,
        {
            headers: {
                'Authorization': `${api.tokens.test}`
            },
            params: parameters   
        }
       );
       log("response status", await response.status());
       log("response body", JSON.stringify(await response.json(), null,'\t'));
       expect(response.status()).toEqual(200);
    });
});