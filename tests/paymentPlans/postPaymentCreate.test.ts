import { APIRequestContext, expect, test } from "@playwright/test";
import { getBaseParameters } from "@entities/baseParameters";
import PaymentCreateRequests from "@requests/paymentCreate.request";
import { Statuses } from "@libs/statuses";
import { PaymentProviders } from "@libs/paymentProviders";
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import { getPaymentPlanStartDate } from '@utils/getPaymentStartDate';
import UserPaymentPlansRequests from "@requests/userPaymentPlan.request";


test.describe("API-тесты создание оплаты подписки", async () => {

    let clubId: number;
    let userId: number;
    let userPaymentPlanId: number;

    const paymentCreateResponse = async (
        request: APIRequestContext,
        status: Statuses,
        providerId: PaymentProviders | null,
        providerGroup: 'subscription' | 'deposit'
    ) => {
        const commonRequestBody = {
            session_id: "549297f8-e38a-47cd-915e-2a1859102539",
            request_id: "4b5b7836-dce6-4b5e-9f18-76be91bd7d37",
            request_source: "crm",
            type: "payment",
            gate_id: 6,
            provider_id: providerId,
            user_id: userId,
            currency: "RUB",
            payment_service_id: 2,
            employee_id: 1,
            fiscal_method: "OrangeData",
        };

        const providerGroupAdditionalFields = {
            subscription: {
                user_payment_plan_id: userPaymentPlanId
            },
            deposit: {
                deposit_amount: 199,
            }
        };

        const requestBody = {
            ...commonRequestBody,
            ...providerGroupAdditionalFields[providerGroup]
        }

        const paymentCreateResponse = await new PaymentCreateRequests(request).postPaymentCreate(status, requestBody);

        return paymentCreateResponse;
    }

    test.beforeAll(async ({ request }) => {
        clubId = await test.step("Получить id клуба", async () => {
            const parameters = { ...await getBaseParameters() };
            const getClubsResponse = await new UserPaymentPlansRequests(request).getClubs(Statuses.OK, parameters);
            const getClubsData = await getClubsResponse.json();
            return getClubsData?.data[0]?.id;
        });
    });

    test.beforeEach(async ({ request }) => {
        userId = await test.step("Получить id клиента", async () => {
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

            const { id } = (await (await new UserPaymentPlansRequests(request).postCreateUser(200, requestBody)).json()).data;

            return id;
        });

        userPaymentPlanId = await test.step("Получить id подписки", async () => {
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
            const response = await new UserPaymentPlansRequests(request).postCreateUserPaymentPlans(200, requestBody, userId);
            const responseData = await response.json();
            const userPaymentPlanId = responseData?.data[0]?.id;

            return userPaymentPlanId;

        });
    })

    test("[positive]создание запроса на оплату подписки клиента c provider_id = 2", async ({ request }) => {
        const paymentCreateSuccessResponse = await test.step("Создать оплату подписки",
            async () => paymentCreateResponse(request, Statuses.OK, PaymentProviders.SUBSCRIPTION_PAYMENT, 'subscription'));

        await test.step("Проверить статус ответа", async () => {
            expect(paymentCreateSuccessResponse.status()).toEqual(Statuses.OK);
        });

        await test.step("Проверить статус транзакции в ответе", async () => {
            expect((await paymentCreateSuccessResponse.json()).transaction.status).toEqual('in progress');
        });
    });

    test("[positive]создание запроса на оплату подписки клиента c provider_id = 6", async ({ request }) => {
        const paymentCreateSuccessResponse = await test.step("Создать оплату подписки",
            async () => paymentCreateResponse(request, Statuses.OK, PaymentProviders.SUBSCRIPTION_REGISTRATION, 'subscription'));

        await test.step("Проверить статус ответа", async () => {
            expect(paymentCreateSuccessResponse.status()).toEqual(Statuses.OK);
        });

        await test.step("Проверить статус транзакции в ответе", async () => {
            expect((await paymentCreateSuccessResponse.json()).transaction.status).toEqual('in progress');
        });
    });

    test("[positive]создание запроса на пополнение депозита", async ({ request }) => {
        const paymentCreateSuccessResponse = await test.step("Создать оплату подписки",
            async () => paymentCreateResponse(request, Statuses.OK, PaymentProviders.DEPOSIT_REPLENISHMENT, 'deposit'));

        await test.step("Проверить статус ответа", async () => {
            expect(paymentCreateSuccessResponse.status()).toEqual(Statuses.OK);
        });

        await test.step("Проверить статус транзакции в ответе", async () => {
            expect((await paymentCreateSuccessResponse.json()).transaction.status).toEqual('in progress');
        });
    });

    test("[negative] создание запроса на оплату подписки клиента", async ({ request }) => {
        const paymentCreateErrorResponse = await test.step("Создать оплату подписки",
            async () => paymentCreateResponse(request, Statuses.BAD_REQUEST, null, 'subscription'));

        await test.step("Проверить статус ответа", async () => {
            expect(paymentCreateErrorResponse.status()).toEqual(Statuses.BAD_REQUEST);
        });

        await test.step("Проверить сообщение об ошибке", async () => {
            expect((await paymentCreateErrorResponse.json()).error.message).toEqual("'provider_id' required");
        });
    });
});
