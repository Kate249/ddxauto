import { RequestSource } from "@libs/requestSource";
import { getPaymentPlanStartDate } from "@utils/getPaymentStartDate";
import requestTestData from "@data/request.json";
import { BaseRequestJson } from "./baseRequestJson";
import paymentTestData from "@data/payment.json"

export interface PaymentPlanDataRequestJson {
    club_id: number;
    user_id: number;
    start_date: string;
    payment_plan_id: number;
    verification_token: string;
}


export const getPaymentPlanRequestJson = async (
    clubId: number,
    userId: number,
    start_date = getPaymentPlanStartDate()
): Promise<BaseRequestJson & PaymentPlanDataRequestJson> => {
    return {
        session_id: requestTestData.sessionId,
        request_id: requestTestData.requestId,
        request_source: RequestSource.CRM,
        club_id: clubId,
        user_id: userId,
        start_date,
        payment_plan_id: paymentTestData.payment_plan_id,
        verification_token: paymentTestData.verification_token
    }

}
