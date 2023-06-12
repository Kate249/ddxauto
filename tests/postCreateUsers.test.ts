import { expect, test } from "@playwright/test";
import api from '../api.json';
import { getRandomEmail, getRandomPhoneNumber } from "../utils/random";

const mockData = {
    session_id: "549297f8-e38a-47cd-915e-2a1859102539",
    request_id: "4b5b7836-dce6-4b5e-9f18-76be91bd7d37",
    request_source: "crm",
    data: {
        email: getRandomEmail(),
        name: "Тест",
        last_name: "Тестович",
        middle_name: "Тестов",
        sex: "male",
        password: "qwerty123",
        phone: getRandomPhoneNumber(),
        birthday: "1990-02-02",
        lang: "ru",
        user_photo_id: 4,
        home_club_id: 1,
        club_access: false,
        admin_panel_access: false,
        class_registration_access: false,
        sport_experience: "0-6 месяцев"
    }
};

test.describe("API-тесты на создание клиентов", async () => {
    test("[positive] создать клиента", async ({ request }) => {
        const response = await request.post(
            `${api.urls.base_url_api}${api.paths.users}`,
            {
                headers: {
                    'Authorization': `${api.tokens.test}`
                },
                data: mockData
            }
        );
        expect(response.status()).toEqual(200);
    });

    test("[positive] создать клиента без пароля", async ({ request }) => {
        const response = await request.post(
            `${api.urls.base_url_api}${api.paths.users}`,
            {
                headers: {
                    'Authorization': `${api.tokens.test}`
                },
                data: {
                    ...mockData,
                    data: {
                        ...mockData.data,
                        password: ''
                    }
                }
            });
        expect(response.status()).toEqual(200);
    });

    test("[positive] создать клиента с опытом в фитнесе 1-2 года", async ({ request }) => {
        const response = await request.post(
            `${api.urls.base_url_api}${api.paths.users}`,
            {
                headers: {
                    'Authorization': `${api.tokens.test}`
                },
                data: {
                    ...mockData,
                    data: {
                        ...mockData.data,
                        sport_experience: "1-2 года"
                    }
                }
            });
        expect(response.status()).toEqual(200);
    });


    test("[positive] создать клиента с опытом в фитнесе 15 лет", async ({ request }) => {
        const response = await request.post(
            `${api.urls.base_url_api}${api.paths.users}`,
            {
                headers: {
                    'Authorization': `${api.tokens.test}`
                },
                data: {
                    ...mockData,
                    data: {
                        ...mockData.data,
                        sport_experience: "15 лет"
                    }
                }
            });
        expect(response.status()).toEqual(400);
    });
});
