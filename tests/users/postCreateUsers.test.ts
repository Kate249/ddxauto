import { expect, request, test } from "@playwright/test";
import api from '../../api.json';
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import { SportExperience } from "@libs/sportExperience";
import { BaseRequestJson } from "@entities/baseRequestJson";
import { UserDataRequestJson, getUserRequestJson } from "@entities/userRequest";

let requestData: BaseRequestJson<UserDataRequestJson>;

const url = `${api.urls.base_url_api}${api.paths.users}`;
const headers = {
    'Authorization': api.tokens.test
};

test.describe("API-тесты на создание клиентов", async () => {

    test.beforeEach(async () => {
        requestData = await getUserRequestJson(1, getRandomEmail(), getRandomPhoneNumber());
    });

    Object.values(SportExperience).forEach(sport_experience => {
        test(`[positive] создать клиента c опытом ${sport_experience}`, async ({ request }) => {

            //    (requestData as unknown as UserDataRequestJson).sport_experience = sport_experience;

            //     const response = await request.post(url, {
            //         headers,
            //         // data: requestData
            //         data: {
            //             ...other,
            //             sport_experience
            //         }
            //     });

            const { data, ...otherRequestDataFields } = requestData;

            const currentRequestData = {
                ...data,
                sport_experience
            };

            const response = await request.post(url, {
                headers,
                data: {
                    data: currentRequestData,
                    ...otherRequestDataFields
                }
            });

            expect(response.status()).toEqual(200);
        });
    });

    test("[positive] создать клиента без пароля", async ({ request }) => {
        const { password, ...dataWithoutPassword } = requestData?.data!;

        const requestDataWithoutPassword = {
            ...requestData,
            data: dataWithoutPassword
        };

        const response = await request.post(url, { headers, data: requestDataWithoutPassword });
        expect(response.status()).toEqual(200);
    });

    test("[positive] создать клиента c опытом в фитнесе не указан", async ({ request }) => {
        const data = {
            ...requestData,
            data: {
                ...requestData.data,
                sport_experience: "Не указано"
            }
        };

        const response = await request.post(url, { headers, data });

        expect(response.status()).toEqual(400);
    });

    test("[negative] создать клиента c опытом в фитнесе 15 лет", async ({ request }) => {
        const data = {
            ...requestData,
            data: {
                ...requestData.data,
                sport_experience: "15 лет"
            }
        };

        const response = await request.post(url, { headers, data });

        expect(response.status()).toEqual(400);
    });
});
