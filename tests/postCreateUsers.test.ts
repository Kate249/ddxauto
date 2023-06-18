import { expect, test } from "@playwright/test";
import api from '../api.json';
import { getRandomEmail, getRandomPhoneNumber } from "../utils/random";

const mockData = {
    session_id: "549297f8-e38a-47cd-915e-2a1859102539",
    request_id: "4b5b7836-dce6-4b5e-9f18-76be91bd7d37",
    request_source: "crm",
    data: {
        email: '',
        phone: '',
        name: "Тест",
        last_name: "Тестович",
        middle_name: "Тестов",
        sex: "male",
        password: "qwerty123",
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

const url = `${api.urls.base_url_api}${api.paths.users}`;
const headers = {
    'Authorization': api.tokens.test
};

test.describe("API-тесты на создание клиентов", async () => {

    test.beforeEach(() => {
        mockData.data.email = getRandomEmail();
        mockData.data.phone = getRandomPhoneNumber();
    });

    test("[positive] создать клиента", async ({ request }) => {

        const response = await request.post(url, { headers, data: mockData });

        expect(response.status()).toEqual(200);
    });

    test("[positive] создать клиента без пароля", async ({ request }) => {
        const { data: { password, ...dataWithoutPassword } } = mockData;

        const mockDataWithoutPassword = {
            ...mockData,
            data: dataWithoutPassword
        };

        const response = await request.post(url, { headers, data: mockDataWithoutPassword });
        expect(response.status()).toEqual(200);
    });

    test("[positive] создать клиента c опытом в фитнесе Нет опыта", async ({ request }) => {
        const data = {
            ...mockData,
            data: {
                ...mockData.data,
                sport_experience: "Нет опыта"
            }
        };

        const response = await request.post(url, { headers, data });

        expect(response.status()).toEqual(200);
    });

    test("[positive] создать клиента c опытом в фитнесе 6-12 месяцев", async ({ request }) => {
        const data = {
            ...mockData,
            data: {
                ...mockData.data,
                sport_experience: "6-12 месяцев"
            }
        };

        const response = await request.post(url, { headers, data });

        expect(response.status()).toEqual(200);
    });

    test("[positive] создать клиента c опытом в фитнесе 1-2 года", async ({ request }) => {
        const data = {
            ...mockData,
            data: {
                ...mockData.data,
                sport_experience: "1-2 года"
            }
        };

        const response = await request.post(url, { headers, data });

        expect(response.status()).toEqual(200);
    });

    test("[positive] создать клиента c опытом в фитнесе 2-3 года", async ({ request }) => {
        const data = {
            ...mockData,
            data: {
                ...mockData.data,
                sport_experience: "2-3 года"
            }
        };

        const response = await request.post(url, { headers, data });

        expect(response.status()).toEqual(200);
    });

    test("[positive] создать клиента c опытом в фитнесе 3-5 лет", async ({ request }) => {
        const data = {
            ...mockData,
            data: {
                ...mockData.data,
                sport_experience: "3-5 лет"
            }
        };

        const response = await request.post(url, { headers, data });

        expect(response.status()).toEqual(200);
    });

    test("[positive] создать клиента c опытом в фитнесе Больше 5 лет", async ({ request }) => {
        const data = {
            ...mockData,
            data: {
                ...mockData.data,
                sport_experience: "Больше 5 лет"
            }
        };

        const response = await request.post(url, { headers, data });

        expect(response.status()).toEqual(200);
    });

    test("[positive] создать клиента c опытом в фитнесе не указан", async ({ request }) => {
        const data = {
            ...mockData,
            data: {
                ...mockData.data,
                sport_experience: "Не указано"
            }
        };

        const response = await request.post(url, { headers, data });

        expect(response.status()).toEqual(400);
    });

    test("[negative] создать клиента c опытом в фитнесе 15 лет", async ({ request }) => {
        const data = {
            ...mockData,
            data: {
                ...mockData.data,
                sport_experience: "15 лет"
            }
        };

        const response = await request.post(url, { headers, data });

        expect(response.status()).toEqual(400);
    });
});
