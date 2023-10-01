import { expect, request, test } from "@playwright/test";
import { getBaseParameters } from "../../entities/baseParameters";
import UsersRequests from "../../requests/users.request";
import UserRequests from "../../requests/users.request";
import { getRandomEmail, getRandomPhoneNumber } from "../../utils/random";
import UserPaymentPlansRequests from "../../requests/userPaymentPlan.request";

test.describe("API-тесты создание подписки клиенту", async () => {

    test("[positive] создание подписки клиенту", async ({ request }) => {

        const clubId = await test.step("Получить id клуба", async () => {
            const parameters = { ...await getBaseParameters() };
            const getClubsResponse = await new UsersRequests(request).getClubs(200, parameters);
            const getClubsData = await getClubsResponse.json();
            return getClubsData?.data[0]?.id;
        });

        const { userId } = await test.step("Получить id клиента", async () => {
            const requestBody = {
                session_id: "549297f8-e38a-47cd-915e-2a1859102539",
                request_id: "4b5b7836-dce6-4b5e-9f18-76be91bd7d37",
                request_source: "crm",
                data: {
                    email: getRandomEmail(),
                    phone: getRandomPhoneNumber(),
                    name: "Тест",
                    last_name: "Тестович",
                    middle_name: "Тестов",
                    sex: "male",
                    password: "qwerty123",
                    birthday: "1990-02-02",
                    lang: "ru",
                    user_photo_id: 4,
                    home_club_id: clubId,
                    club_access: false,
                    admin_panel_access: false,
                    class_registration_access: false,
                    sport_experience: "0-6 месяцев"
                }
            };

            const { id } = (await (await new UserRequests(request).postCreateUser(200, requestBody)).json()).data;

            return {
                userId: id,
            }
        });

        const paymentPlanResponseData = await test.step("Создать подписку", async () => {
            const requestBody = {
                session_id: "549297f8-e38a-47cd-915e-2a1859102539",
                request_id: "4b5b7836-dce6-4b5e-9f18-76be91bd7d37",
                request_source: "crm",
                    club_id: clubId,
                    user_id: userId,
                    start_date: "2023-10-01",
                    payment_plan_id: 18,
                    verification_token: "524897e8-b94f-49a6-a945-5dbb5c3df14s"
            }

            const paymentPlanResponse = await new UserPaymentPlansRequests(request).postCreateUserPaymentPlans(200, requestBody, userId);
            const paymentPlanResponseData = await paymentPlanResponse.json();

            return paymentPlanResponseData;
        });

        expect(paymentPlanResponseData?.data?.[0]?.status).toEqual("Created");
    });
});
