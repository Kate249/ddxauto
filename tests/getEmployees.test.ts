import { expect, test } from "@playwright/test";
import api from '../api.json';
import { getBaseParameters } from "../entities/baseParameters";

const club_ids = [1, 2, 3, 4, 5];
test.describe("API-тесты на получение информации о сотрудниках", async () => {
    test("[positive] получить информацию о сотрудниках", async ({ request }) => {

        const response = await request.get(
            `${api.urls.base_url_api}${api.paths.employees}`,
            {
                headers: {
                    'Authorization': `${api.tokens.test}`
                },
                params: {
                    ...await getBaseParameters(),
                }

            }
        );
        expect(response.status()).toEqual(200);
    });

    club_ids.forEach(club_id => {
        test(`[positive] получить информацию о сотрудниках в клубе ${club_id}`, async ({ request }) => {

            const response = await request.get(
                `${api.urls.base_url_api}${api.paths.employees}`,
                {
                    headers: {
                        'Authorization': `${api.tokens.test}`
                    },
                    params: {
                        ...await getBaseParameters(),
                        club_id: club_id,
                    }

                }
            );
            expect(response.status()).toEqual(200);
        });
    });
});