import { APIResponse } from "@playwright/test";
import paths from '../api.json'
import BaseRequest from "./baseRequest.request";

export default class VerifyRequest extends BaseRequest {
    async postGetCode(status: number, requestData: any): Promise <APIResponse> {
        return (await this.post(`${this.baseUrl}${paths.paths.get_code}`, status, requestData));
    }
}
