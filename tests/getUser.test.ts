import { expect, test } from "@playwright/test";
import { getBaseParameters } from "../entities/baseParameters";
import GetUsersRequests from "../requests/getUsers.requests";
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

    test("[positive] получить информации о пользователе email", async ({ request }) => {
        const parameters = {...await getBaseParameters()};
        
        const getClubsResponse = await new GetUsersRequests(request).getClubs(200, parameters);
        const getClubsData = await getClubsResponse.json();
        const clubId = getClubsData?.data[0]?.id;

        const requestBody = {
            ...mockUserData,
            data: {
                ...mockUserData.data,
                home_club_id: clubId
            }
        };

        const postUsersResponse = await new GetUsersRequests(request).postCreateUser(200, requestBody);
        const postUserData = await postUsersResponse.json();
        const userId = postUserData?.data?.id;

        const getUsersResponse = await new GetUsersRequests(request).getUsers(200, parameters, userId);
        const getUsersData = await getUsersResponse.json();

        expect(postUserData?.data?.email).toEqual(getUsersData?.data?.email);
    });

    test("[positive] получить информации о пользователе phone", async ({ request }) => {
        const parameters = {...await getBaseParameters()};
        
        const getClubsResponse = await new GetUsersRequests(request).getClubs(200, parameters);
        const getClubsData = await getClubsResponse.json();
        const clubId = getClubsData?.data[0]?.id;

        const requestBody = {
            ...mockUserData,
            data: {
                ...mockUserData.data,
                home_club_id: clubId
            }
        };

        const postUsersResponse = await new GetUsersRequests(request).postCreateUser(200, requestBody);
        const postUserData = await postUsersResponse.json();
        const userId = postUserData?.data?.id;

        const getUsersResponse = await new GetUsersRequests(request).getUsers(200, parameters, userId);
        const getUsersData = await getUsersResponse.json();

        expect(postUserData?.data?.phone).toEqual(getUsersData?.data?.phone);
    });

    test("[positive] получить информации о пользователе name", async ({ request }) => {
        const parameters = {...await getBaseParameters()};
        
        const getClubsResponse = await new GetUsersRequests(request).getClubs(200, parameters);
        const getClubsData = await getClubsResponse.json();
        const clubId = getClubsData?.data[0]?.id;

        const requestBody = {
            ...mockUserData,
            data: {
                ...mockUserData.data,
                home_club_id: clubId
            }
        };

        const postUsersResponse = await new GetUsersRequests(request).postCreateUser(200, requestBody);
        const postUserData = await postUsersResponse.json();
        const userId = postUserData?.data?.id;

        const getUsersResponse = await new GetUsersRequests(request).getUsers(200, parameters, userId);
        const getUsersData = await getUsersResponse.json();

        expect(postUserData?.data?.name).toEqual(getUsersData?.data?.name);
    });

    test("[positive] получить информации о пользователе last_name", async ({ request }) => {
        const parameters = {...await getBaseParameters()};
        
        const getClubsResponse = await new GetUsersRequests(request).getClubs(200, parameters);
        const getClubsData = await getClubsResponse.json();
        const clubId = getClubsData?.data[0]?.id;

        const requestBody = {
            ...mockUserData,
            data: {
                ...mockUserData.data,
                home_club_id: clubId
            }
        };

        const postUsersResponse = await new GetUsersRequests(request).postCreateUser(200, requestBody);
        const postUserData = await postUsersResponse.json();
        const userId = postUserData?.data?.id;

        const getUsersResponse = await new GetUsersRequests(request).getUsers(200, parameters, userId);
        const getUsersData = await getUsersResponse.json();

        expect(postUserData?.data?.last_name).toEqual(getUsersData?.data?.last_name);
    });

    test("[positive] получить информации о пользователе middle_name", async ({ request }) => {
        const parameters = {...await getBaseParameters()};
        
        const getClubsResponse = await new GetUsersRequests(request).getClubs(200, parameters);
        const getClubsData = await getClubsResponse.json();
        const clubId = getClubsData?.data[0]?.id;

        const requestBody = {
            ...mockUserData,
            data: {
                ...mockUserData.data,
                home_club_id: clubId
            }
        };

        const postUsersResponse = await new GetUsersRequests(request).postCreateUser(200, requestBody);
        const postUserData = await postUsersResponse.json();
        const userId = postUserData?.data?.id;

        const getUsersResponse = await new GetUsersRequests(request).getUsers(200, parameters, userId);
        const getUsersData = await getUsersResponse.json();

        expect(postUserData?.data?.middle_name).toEqual(getUsersData?.data?.middle_name);
    });
    
    test("[positive] получить информации о пользователе sex", async ({ request }) => {
        const parameters = {...await getBaseParameters()};
        
        const getClubsResponse = await new GetUsersRequests(request).getClubs(200, parameters);
        const getClubsData = await getClubsResponse.json();
        const clubId = getClubsData?.data[0]?.id;

        const requestBody = {
            ...mockUserData,
            data: {
                ...mockUserData.data,
                home_club_id: clubId
            }
        };

        const postUsersResponse = await new GetUsersRequests(request).postCreateUser(200, requestBody);
        const postUserData = await postUsersResponse.json();
        const userId = postUserData?.data?.id;

        const getUsersResponse = await new GetUsersRequests(request).getUsers(200, parameters, userId);
        const getUsersData = await getUsersResponse.json();

        expect(postUserData?.data?.sex).toEqual(getUsersData?.data?.sex);
    });


    test("[positive] получить информации о пользователе password", async ({ request }) => {
        const parameters = {...await getBaseParameters()};
        
        const getClubsResponse = await new GetUsersRequests(request).getClubs(200, parameters);
        const getClubsData = await getClubsResponse.json();
        const clubId = getClubsData?.data[0]?.id;

        const requestBody = {
            ...mockUserData,
            data: {
                ...mockUserData.data,
                home_club_id: clubId
            }
        };

        const postUsersResponse = await new GetUsersRequests(request).postCreateUser(200, requestBody);
        const postUserData = await postUsersResponse.json();
        const userId = postUserData?.data?.id;

        const getUsersResponse = await new GetUsersRequests(request).getUsers(200, parameters, userId);
        const getUsersData = await getUsersResponse.json();

        expect(postUserData?.data?.password).toEqual(getUsersData?.data?.password);
    });

    test("[positive] получить информации о пользователе birthday", async ({ request }) => {
        const parameters = {...await getBaseParameters()};
        
        const getClubsResponse = await new GetUsersRequests(request).getClubs(200, parameters);
        const getClubsData = await getClubsResponse.json();
        const clubId = getClubsData?.data[0]?.id;

        const requestBody = {
            ...mockUserData,
            data: {
                ...mockUserData.data,
                home_club_id: clubId
            }
        };

        const postUsersResponse = await new GetUsersRequests(request).postCreateUser(200, requestBody);
        const postUserData = await postUsersResponse.json();
        const userId = postUserData?.data?.id;

        const getUsersResponse = await new GetUsersRequests(request).getUsers(200, parameters, userId);
        const getUsersData = await getUsersResponse.json();

        expect(postUserData?.data?.birthday).toEqual(getUsersData?.data?.birthday);
    });

    test("[positive] получить информации о пользователе parent", async ({ request }) => {
        const parameters = {...await getBaseParameters()};
        
        const getClubsResponse = await new GetUsersRequests(request).getClubs(200, parameters);
        const getClubsData = await getClubsResponse.json();
        const clubId = getClubsData?.data[0]?.id;

        const requestBody = {
            ...mockUserData,
            data: {
                ...mockUserData.data,
                home_club_id: clubId
            }
        };

        const postUsersResponse = await new GetUsersRequests(request).postCreateUser(200, requestBody);
        const postUserData = await postUsersResponse.json();
        const userId = postUserData?.data?.id;

        const getUsersResponse = await new GetUsersRequests(request).getUsers(200, parameters, userId);
        const getUsersData = await getUsersResponse.json();

        expect(postUserData?.data?.parent).toEqual(getUsersData?.data?.parent);
    });

    test("[positive] получить информации о пользователе lang", async ({ request }) => {
        const parameters = {...await getBaseParameters()};
        
        const getClubsResponse = await new GetUsersRequests(request).getClubs(200, parameters);
        const getClubsData = await getClubsResponse.json();
        const clubId = getClubsData?.data[0]?.id;

        const requestBody = {
            ...mockUserData,
            data: {
                ...mockUserData.data,
                home_club_id: clubId
            }
        };

        const postUsersResponse = await new GetUsersRequests(request).postCreateUser(200, requestBody);
        const postUserData = await postUsersResponse.json();
        const userId = postUserData?.data?.id;

        const getUsersResponse = await new GetUsersRequests(request).getUsers(200, parameters, userId);
        const getUsersData = await getUsersResponse.json();

        expect(postUserData?.data?.lang).toEqual(getUsersData?.data?.lang);
    });

    test("[positive] получить информации о пользователе user_photo_id", async ({ request }) => {
        const parameters = {...await getBaseParameters()};
        
        const getClubsResponse = await new GetUsersRequests(request).getClubs(200, parameters);
        const getClubsData = await getClubsResponse.json();
        const clubId = getClubsData?.data[0]?.id;

        const requestBody = {
            ...mockUserData,
            data: {
                ...mockUserData.data,
                home_club_id: clubId
            }
        };

        const postUsersResponse = await new GetUsersRequests(request).postCreateUser(200, requestBody);
        const postUserData = await postUsersResponse.json();
        const userId = postUserData?.data?.id;

        const getUsersResponse = await new GetUsersRequests(request).getUsers(200, parameters, userId);
        const getUsersData = await getUsersResponse.json();

        expect(postUserData?.data?.user_photo_id).toEqual(getUsersData?.data?.user_photo_id);
    });

    test("[positive] получить информации о пользователе home_club_id", async ({ request }) => {
        const parameters = {...await getBaseParameters()};
        
        const getClubsResponse = await new GetUsersRequests(request).getClubs(200, parameters);
        const getClubsData = await getClubsResponse.json();
        const clubId = getClubsData?.data[0]?.id;

        const requestBody = {
            ...mockUserData,
            data: {
                ...mockUserData.data,
                home_club_id: clubId
            }
        };

        const postUsersResponse = await new GetUsersRequests(request).postCreateUser(200, requestBody);
        const postUserData = await postUsersResponse.json();
        const userId = postUserData?.data?.id;

        const getUsersResponse = await new GetUsersRequests(request).getUsers(200, parameters, userId);
        const getUsersData = await getUsersResponse.json();

        expect(postUserData?.data?.home_club_id).toEqual(getUsersData?.data?.home_club_id);
    });

    test("[positive] получить информации о пользователе club_access", async ({ request }) => {
        const parameters = {...await getBaseParameters()};
        
        const getClubsResponse = await new GetUsersRequests(request).getClubs(200, parameters);
        const getClubsData = await getClubsResponse.json();
        const clubId = getClubsData?.data[0]?.id;

        const requestBody = {
            ...mockUserData,
            data: {
                ...mockUserData.data,
                home_club_id: clubId
            }
        };

        const postUsersResponse = await new GetUsersRequests(request).postCreateUser(200, requestBody);
        const postUserData = await postUsersResponse.json();
        const userId = postUserData?.data?.id;

        const getUsersResponse = await new GetUsersRequests(request).getUsers(200, parameters, userId);
        const getUsersData = await getUsersResponse.json();

        expect(postUserData?.data?.club_access).toEqual(getUsersData?.data?.club_access);
    });

    test("[positive] получить информации о пользователеadmin_panel_access", async ({ request }) => {
        const parameters = {...await getBaseParameters()};
        
        const getClubsResponse = await new GetUsersRequests(request).getClubs(200, parameters);
        const getClubsData = await getClubsResponse.json();
        const clubId = getClubsData?.data[0]?.id;

        const requestBody = {
            ...mockUserData,
            data: {
                ...mockUserData.data,
                home_club_id: clubId
            }
        };

        const postUsersResponse = await new GetUsersRequests(request).postCreateUser(200, requestBody);
        const postUserData = await postUsersResponse.json();
        const userId = postUserData?.data?.id;

        const getUsersResponse = await new GetUsersRequests(request).getUsers(200, parameters, userId);
        const getUsersData = await getUsersResponse.json();

        expect(postUserData?.data?.admin_panel_access).toEqual(getUsersData?.data?.admin_panel_access);
    });

    test("[positive] получить информации о пользователе class_registration_access", async ({ request }) => {
        const parameters = {...await getBaseParameters()};
        
        const getClubsResponse = await new GetUsersRequests(request).getClubs(200, parameters);
        const getClubsData = await getClubsResponse.json();
        const clubId = getClubsData?.data[0]?.id;

        const requestBody = {
            ...mockUserData,
            data: {
                ...mockUserData.data,
                home_club_id: clubId
            }
        };

        const postUsersResponse = await new GetUsersRequests(request).postCreateUser(200, requestBody);
        const postUserData = await postUsersResponse.json();
        const userId = postUserData?.data?.id;

        const getUsersResponse = await new GetUsersRequests(request).getUsers(200, parameters, userId);
        const getUsersData = await getUsersResponse.json();

        expect(postUserData?.data?.class_registration_access).toEqual(getUsersData?.data?.class_registration_access);
    });


    test("[positive] получить информации о пользователе sport_experience", async ({ request }) => {
        const parameters = {...await getBaseParameters()};
        
        const getClubsResponse = await new GetUsersRequests(request).getClubs(200, parameters);
        const getClubsData = await getClubsResponse.json();
        const clubId = getClubsData?.data[0]?.id;

        const requestBody = {
            ...mockUserData,
            data: {
                ...mockUserData.data,
                home_club_id: clubId
            }
        };

        const postUsersResponse = await new GetUsersRequests(request).postCreateUser(200, requestBody);
        const postUserData = await postUsersResponse.json();
        const userId = postUserData?.data?.id;

        const getUsersResponse = await new GetUsersRequests(request).getUsers(200, parameters, userId);
        const getUsersData = await getUsersResponse.json();

        expect(postUserData?.data?.sport_experience).toEqual(getUsersData?.data?.sport_experience);
    });

    test("[positive] получить информации о пользователе id", async ({ request }) => {
        const parameters = {...await getBaseParameters()};
        
        const getClubsResponse = await new GetUsersRequests(request).getClubs(200, parameters);
        const getClubsData = await getClubsResponse.json();
        const clubId = getClubsData?.data[0]?.id;

        const requestBody = {
            ...mockUserData,
            data: {
                ...mockUserData.data,
                home_club_id: clubId
            }
        };

        const postUsersResponse = await new GetUsersRequests(request).postCreateUser(200, requestBody);
        const postUserData = await postUsersResponse.json();
        const userId = postUserData?.data?.id;

        const getUsersResponse = await new GetUsersRequests(request).getUsers(200, parameters, userId);
        const getUsersData = await getUsersResponse.json();

        expect(postUserData?.data?.id).toEqual(getUsersData?.data?.id);
    });

    test("[positive] получить информации о пользователе created_at", async ({ request }) => {
        const parameters = {...await getBaseParameters()};
        
        const getClubsResponse = await new GetUsersRequests(request).getClubs(200, parameters);
        const getClubsData = await getClubsResponse.json();
        const clubId = getClubsData?.data[0]?.id;

        const requestBody = {
            ...mockUserData,
            data: {
                ...mockUserData.data,
                home_club_id: clubId
            }
        };

        const postUsersResponse = await new GetUsersRequests(request).postCreateUser(200, requestBody);
        const postUserData = await postUsersResponse.json();
        const userId = postUserData?.data?.id;

        const getUsersResponse = await new GetUsersRequests(request).getUsers(200, parameters, userId);
        const getUsersData = await getUsersResponse.json();

        expect(postUserData?.data?.created_at).toEqual(getUsersData?.data?.created_at);
    });

    test("[positive] получить информации о пользователе updated_at", async ({ request }) => {
        const parameters = {...await getBaseParameters()};
        
        const getClubsResponse = await new GetUsersRequests(request).getClubs(200, parameters);
        const getClubsData = await getClubsResponse.json();
        const clubId = getClubsData?.data[0]?.id;

        const requestBody = {
            ...mockUserData,
            data: {
                ...mockUserData.data,
                home_club_id: clubId
            }
        };

        const postUsersResponse = await new GetUsersRequests(request).postCreateUser(200, requestBody);
        const postUserData = await postUsersResponse.json();
        const userId = postUserData?.data?.id;

        const getUsersResponse = await new GetUsersRequests(request).getUsers(200, parameters, userId);
        const getUsersData = await getUsersResponse.json();

        expect(postUserData?.data?.updated_at).toEqual(getUsersData?.data?.updated_at);
    });
});
