import { expect, test } from "@playwright/test";
import api from '../../api.json';
import { getBaseParameters } from "../../entities/baseParameters";
import { log } from "@utils/logger";

const club_ids = [1, 2, 3, 4, 5];

test.describe("API-тесты на получение информации о сотрудниках", async () => {

    const url = `${api.urls.base_url_api}${api.paths.employees}`;
    const parameters = {...await getBaseParameters()};

    test("[positive] получить информацию о сотрудниках", async ({ request }) => {

        log('request url', url);
        log("request parameters", parameters);

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

    club_ids.forEach(club_id => {
        test(`[positive] получить информацию о сотрудниках в клубе ${club_id}`, async ({ request }) => {

            log('request url', url);
            log("request parameters", {...parameters, club_id});

            const response = await request.get(
                url,
                {
                    headers: {
                        'Authorization': `${api.tokens.test}`
                    },
                    params: {
                        ...parameters,
                        club_id: club_id,
                    }

                }
            );
            log("response status", await response.status());
            log("response body", JSON.stringify(await response.json(), null,'\t'));
            expect(response.status()).toEqual(200);
        });
    });
});