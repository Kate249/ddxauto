
import { expect, test } from "@playwright/test";
import api from '../../api.json';
import { log } from "@utils/logger";

const mockData = {
        "session_id": "549297f8-e38a-47cd-915e-2a1859102539",
        "request_id": "4b5b7836-dce6-4b5e-9f18-76be91bd7d37",
        "request_source": "crm",
        "data": [
          {
            "id": 1165801,
            "access_card_number": "string",
            "user_id": 1165801,
            "type": "bracelet", 
            "is_blocked": true,
            "is_lost": true,
            "is_deleted": true,
            "block_previous_card": true,
            "payable": "guest"
          }
        ]
    
}

test.describe("API-тесты на добавление карту доступа", async () => {
    test("[positive] добавить карту доступа", async ({ request }) => {
        const url = `${api.urls.base_url_api}${api.paths.accessCards}`;

        log('request url', url);
        log("request body", mockData);

        const response = await request.post(
        url,

            {
                headers: {
                    'Authorization': `${api.tokens.test}`
                },
                    "data": mockData
            }
        );
        log("response status", await response.status());
        log("response body", JSON.stringify(await response.json(), null,'\t'));
        expect(response.status()).toEqual(200);
    });
});