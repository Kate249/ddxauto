import { RequestSource } from "@libs/requestSource";
import { SportExperience } from "@libs/sportExperience";
import userTestData from "@data/user.json"
import requestTestData from "@data/request.json";
import { BaseRequestJson } from "./baseRequestJson";
import { getRandomTestName } from "@utils/random";


export interface UserDataRequestJson {
    email: string;
    phone: string;
    name: string;
    last_name: string;
    middle_name: string;
    sex: string;
    password: string;
    birthday: string;
    lang: string;
    user_photo_id: number;
    home_club_id: number;
    club_access: boolean;
    admin_panel_access: boolean;
    class_registration_access: boolean;
    sport_experience: string;
}

export const getUserRequestJson = async (
    clubId: number,
    email: string,
    phone: string,
    name = getRandomTestName()
): Promise<BaseRequestJson<UserDataRequestJson>> => {
    return {
        session_id: requestTestData.sessionId,
        request_id: requestTestData.requestId,
        request_source: RequestSource.CRM,
        data: {
            email,
            phone,
            name,
            last_name: userTestData.lastName,
            birthday: userTestData.birthday,
            middle_name: userTestData.middleName,
            sex: userTestData.sex.male,
            password: userTestData.password,
            lang: userTestData.lang,
            user_photo_id: userTestData.userPhotoId,
            home_club_id: clubId,
            club_access: false,
            admin_panel_access: false,
            class_registration_access: false,
            sport_experience: SportExperience.ZERO_SIX_MONTHS
        }
    }
}
