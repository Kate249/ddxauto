import { expect, test } from "@playwright/test";
import { getBaseParameters } from "@entities/baseParameters";
import UsersRequests from "@requests/users.request";
import UserRequests from "@requests/users.request";
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import UserPaymentPlansRequests from "@requests/userPaymentPlan.request";
import { getPaymentPlanStartDate } from '@utils/getPaymentStartDate';
import { Statuses } from "@libs/statuses";
import { getUserRequestJson } from "@entities/userRequest";

test.describe("API-тесты создание подписки клиенту", async () => {

    test("[positive] создание подписки клиенту", async ({ request }) => {

        const clubId = await test.step("Получить id клуба", async () => {
            const parameters = { ...await getBaseParameters() };
            const getClubsResponse = await new UsersRequests(request).getClubs(Statuses.OK, parameters);
            const getClubsData = await getClubsResponse.json();
            return getClubsData?.data[0]?.id;
        });

        const { userId } = await test.step("Получить id клиента", async () => {
            const requestBody = await getUserRequestJson(clubId, getRandomEmail(), getRandomPhoneNumber());

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
                    start_date: getPaymentPlanStartDate(),
                    payment_plan_id: 18,
                    verification_token: "0453f70a-2abe-4f47-a1de-0ea7d9f382e9"
            }

            const paymentPlanResponse = await new UserPaymentPlansRequests(request).postCreateUserPaymentPlans(200, requestBody, userId);
            const paymentPlanResponseData = await paymentPlanResponse.json();

            return paymentPlanResponseData;
        });

        expect(paymentPlanResponseData?.data?.[0]?.status).toEqual("Created");
    });
});
