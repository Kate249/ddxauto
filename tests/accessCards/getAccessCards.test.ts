
import { expect, test } from "@playwright/test";
import AccessCardRequests from "../../requests/accessCards.requests";
import { getBaseParameters } from "../../entities/baseParameters";

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
};

test.describe("API-тесты на получение информации о карте доступа", async () => {
    test("[positive] получить информацию о карте доступа", async ({ request }) => {
        const createdCard = await new AccessCardRequests(request).postAccessCard(200, mockData);
        const createdAccessCardId = (await createdCard.json()).data[0].id;

        const response = await new AccessCardRequests(request).getAccessCardById(200, await getBaseParameters(), createdAccessCardId);
        const userId = (await response.json()).data[0].user.id;
        //можно добавить любые проверки ожидаемых и полученных данных
        // в данном случае проверяется, что id клиента созданной карты совпадает с id клиента получнной карты
        expect(userId).toEqual(createdAccessCardId);
    });
});