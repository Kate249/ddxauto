import { expect, request, test } from "@playwright/test";
import { getBaseParameters } from "@entities/baseParameters";
import UsersRequests from "@requests/users.request";
import UserRequests from "@requests/users.request";
import VerifyRequest from "@requests/verify.request";
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import { getUserRequestJson } from "@entities/userRequest";

test.describe("API-тесты на отправку кода верификации клиенту", async () => {

    test("[positive] отправка кода верификации клиенту", async ({ request }) => {

        const clubId = await test.step("Получить id клуба", async () => {
            const parameters = { ...await getBaseParameters() };
            const getClubsResponse = await new UsersRequests(request).getClubs(200, parameters);
            const getClubsData = await getClubsResponse.json();
            return getClubsData?.data[0]?.id;
        });

        const { userId, userPhone } = await test.step("Получить id клиента", async () => {
            const requestBody = await getUserRequestJson(clubId, getRandomEmail(), getRandomPhoneNumber());

            const { id, phone} = (await (await new UserRequests(request).postCreateUser(200, requestBody)).json()).data;

            return {
                userId: id,
                userPhone: phone
            }
        });

        const response = await test.step("Отправить код верификации клиенту", async () => {
            const requestBody = {
                session_id: "549297f8-e38a-47cd-915e-2a1859102539",
                request_id: "4b5b7836-dce6-4b5e-9f18-76be91bd7d37",
                request_source: "crm",
                data: {
                    message_type: "sms",
                    contact: userPhone,
                    template: "mail_signing_an_agreement",
                    user_id: userId
                }
            }

            const response = await new VerifyRequest(request).postGetCode(200, requestBody);

            return response.json();
        });

        // await test("Проверки", async () => {
            expect(response.status).toEqual('OK');
        // });
    });
});
