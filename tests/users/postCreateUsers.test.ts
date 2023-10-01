import { expect, test } from "@playwright/test";
<<<<<<< Updated upstream:tests/postCreateUsers.test.ts
import api from '../api.json';
import { getRandomEmail, getRandomPhoneNumber } from "../utils/random";
=======
import api from '../../api.json';
import { getRandomEmail, getRandomPhoneNumber } from "../../utils/random";
import UserRequests from "../../requests/users.request";
>>>>>>> Stashed changes:tests/users/postCreateUsers.test.ts

const sport_experiences = [
    "0-6 месяцев",
    "Нет опыта",
    "6-12 месяцев",
    "1-2 года",
    "2-3 года",
    "3-5 лет",
    "Больше 5 лет",
];

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

    sport_experiences.forEach(sport_experience => {
        test(`[positive] создать клиента c опытом ${sport_experience}`, async ({ request }) => {

            const response = await request.post(url, { headers, data: mockData });
    
            expect(response.status()).toEqual(200);
        });
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
