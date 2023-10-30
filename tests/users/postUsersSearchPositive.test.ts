import { APIRequestContext, expect, test } from "@playwright/test";
import { getBaseParameters } from "@entities/baseParameters";
import { Statuses } from "@libs/statuses";
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import UserPaymentPlansRequests from "@requests/userPaymentPlan.request";
import UsersSearchRequests from "@requests/usersSearch.request";

type UserCreateResponseData = {
    id: number;
    name: string;
    last_name: string;
    birthday: string;
    email: string;
    phone: string;
};

test.describe.only("[positive]API-тесты поиска клиента", async () => {

    let clubId: number;
    let userCreateResponseData: UserCreateResponseData;

    const usersSearchResponse = async (
        request: APIRequestContext,
        status: Statuses,
        userCreateResponseData: Partial<UserCreateResponseData>,
    ) => {
        const requestBody = {
            session_id: "549297f8-e38a-47cd-915e-2a1859102539",
            request_id: "4b5b7836-dce6-4b5e-9f18-76be91bd7d37",
            request_source: "crm",
            data: {...userCreateResponseData}
        };

        const usersSearchResponse = await new UsersSearchRequests(request).postUsersSearch(status, requestBody);

        return usersSearchResponse;
    }

    test.beforeAll(async ({ request }) => {
        clubId = await test.step("Получить id клуба", async () => {
            const parameters = { ...await getBaseParameters() };
            const getClubsResponse = await new UserPaymentPlansRequests(request).getClubs(Statuses.OK, parameters);
            const getClubsData = await getClubsResponse.json();
            const clubId = getClubsData?.data[0]?.id;

            return clubId;
        });

        userCreateResponseData = await test.step("Получить id клиента", async () => {
            const requestBody = {
                session_id: "549297f8-e38a-47cd-915e-2a1859102539",
                request_id: "4b5b7836-dce6-4b5e-9f18-76be91bd7d37",
                request_source: "crm",
                data: {
                    email: getRandomEmail(),
                    phone: getRandomPhoneNumber(),
                    name: "Тест1",
                    last_name: "Тестов1",
                    birthday: "1999-06-21",
                    middle_name: "Тестов",
                    sex: "male",
                    password: "qwerty123",
                    lang: "ru",
                    user_photo_id: 4,
                    home_club_id: clubId,
                    club_access: false,
                    admin_panel_access: false,
                    class_registration_access: false,
                    sport_experience: "0-6 месяцев"
                }
            };

            const postCreateUserResponse = await new UserPaymentPlansRequests(request).postCreateUser(200, requestBody);
            const postCreateUserResponseData = await postCreateUserResponse.json();
            const { id, name, last_name, email, phone, birthday } = postCreateUserResponseData?.data
            const userCreateResponseData = {
                id,
                name,
                last_name,
                email,
                phone,
                birthday
            };

            return userCreateResponseData;
        });
    });

    test("Поиск клиента по номеру телефона", async ({ request }) => {

        const { phone } = userCreateResponseData;

        const response = await test.step("поиск клиента",
        async () => usersSearchResponse(request, Statuses.OK, { phone }));

        await test.step("Проверить статус ответа", async () => {
            expect(response.status()).toEqual(Statuses.OK);
        });

        await test.step("Проверить id клиента", async () => {
            const userSearchId = (await response.json())?.data[0]?.id
            expect(userSearchId).toEqual(userCreateResponseData?.id);
        });
    });

    test("Поиск клиента по имени, фамилии и дате рождения", async ({ request }) => {
        const { name, last_name, birthday } = userCreateResponseData;

        const response = await test.step("поиск клиента",
        async () => usersSearchResponse(request, Statuses.OK, { name, last_name, birthday }));

        await test.step("Проверить статус ответа", async () => {
            expect(response.status()).toEqual(Statuses.OK);
        });

        await test.step("Проверить id клиента", async () => {
            const userSearchId = (await response.json())?.data[0]?.id
            expect(userSearchId).toEqual(userCreateResponseData?.id);
        });
    });

    test("Поиск клиента по фамилии и email", async ({ request }) => {
        const { last_name, email } = userCreateResponseData;

        const response = await test.step("поиск клиента",
        async () => usersSearchResponse(request, Statuses.OK, { last_name, email }));

        await test.step("Проверить статус ответа", async () => {
            expect(response.status()).toEqual(Statuses.OK);
        });

        await test.step("Проверить id клиента", async () => {
            const userSearchId = (await response.json())?.data[0]?.id
            expect(userSearchId).toEqual(userCreateResponseData?.id);
        });
    });


});