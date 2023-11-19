import requestTestData from "@data/request.json";
import { RequestSource } from "@libs/requestSource";

export async function getBaseParameters(): Promise<object> {
    return {
        session_id: requestTestData.sessionId,
            request_id: requestTestData.requestId,
            request_source: RequestSource.CRM,
    }
}