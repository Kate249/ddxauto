import { expect, test } from "@playwright/test";
import { getBaseParameters } from "../entities/baseParameters";
import UsersRequests from "../requests/users.request";
import { getRandomEmail, getRandomPhoneNumber } from "../utils/random";

const mockUserData = {
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


test.describe("API-тесты на получение информации о пользователе", async () => {
    test.beforeEach(() => {
        mockUserData.data.email = getRandomEmail();
        mockUserData.data.phone = getRandomPhoneNumber();
    });

    test.only("[positive] получить информации о пользователе", async ({ request }) => {
        const parameters = {...await getBaseParameters()};
        
        const getClubsResponse = await new UsersRequests(request).getClubs(200, parameters);
        const getClubsData = await getClubsResponse.json();
        const clubId = getClubsData?.data[0]?.id;

        const requestBody = {
            ...mockUserData,
            data: {
                ...mockUserData.data,
                home_club_id: clubId
            }
        };

        const postUsersResponse = await new UsersRequests(request).postCreateUser(200, requestBody);
        const { data: postUserData = {} } = await postUsersResponse.json();
        const userId = postUserData?.id;

        const getUsersResponse = await new UsersRequests(request).getUsers(200, parameters, userId);
        const {data: getUsersData = {} } = await getUsersResponse.json();

        Object.entries(postUserData).forEach(([postDataKey, postDataValue]) => {
            if (
                postDataKey in getUsersData &&
                postDataKey !== 'created_at' &&
                postDataKey !== 'updated_at'
            ) {
                expect(postDataValue).toEqual(getUsersData?.[postDataKey]);
            }
        });

    });
});
