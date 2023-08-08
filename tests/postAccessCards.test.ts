
import { expect, test } from "@playwright/test";
import AccessCardRequsts from "../requests/accessCards.requests";

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
      await new AccessCardRequsts(request).postAccessCard(200, mockData);
    });
});