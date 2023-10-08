import { expect, test } from "@playwright/test";
import api from '../../api.json';
import { getBaseParameters } from "../../entities/baseParameters";

const mockData = {
    "session_id": "549297f8-e38a-47cd-915e-2a1859102539",
    "request_id": "4b5b7836-dce6-4b5e-9f18-76be91bd7d37",
    "request_source": "crm",
    "data": [
        {
            "text": "Обещал привязать карту",
            "employee_id": 3481,
            "user_id": 1156252,
            "type": "block"
        }
    ]
}

test.describe("API-тесты на создание заметки", async () => {
    test("[positive] создать заметку", async ({ request }) => {
        const response = await request.post(
            `${api.urls.base_url_api}${api.paths.notes}`,
            {
                headers: {
                    'Authorization': `${api.tokens.test}`
                },
                data: mockData
            }
        );
        expect(response.status()).toEqual(200);
    });
});