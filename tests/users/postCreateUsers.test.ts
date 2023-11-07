import { expect, request, test } from "@playwright/test";
import api from '../../api.json';
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import { RequestSource } from "@libs/requestSource";
import { SportExperience } from "@libs/sportExperience";
import userTestData from "@data/user.json";
import requestTestData from "@data/request.json";

const mockData = {
    session_id: requestTestData.sessionId,
    request_id: requestTestData.requestId,
    request_source: RequestSource.CRM,
    data: {
        email: '',
        phone: '',
        name: userTestData.firstName,
        last_name: userTestData.lastName,
        middle_name: userTestData.middleName,
        sex: userTestData.sex.male,
        password: userTestData.password,
        birthday: userTestData.birthday,
        lang: userTestData.lang,
        user_photo_id: userTestData.userPhotoId,
        home_club_id: 1,
        club_access: false,
        admin_panel_access: false,
        class_registration_access: false,
        sport_experience: SportExperience.ZERO_SIX_MONTHS
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

    Object.values(SportExperience).forEach(sport_experience => {
        test(`[positive] создать клиента c опытом ${sport_experience}`, async ({ request }) => {

            const { data, ...otherMockDataFields } = mockData;

            const response = await request.post(url, {
                headers,
                data: {
                    ...otherMockDataFields,
                    data: {
                        ...data,
                        sport_experience
                    }
                }
            });

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
