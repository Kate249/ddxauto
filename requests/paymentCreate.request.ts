import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequest.request";
import paths from '../api.json';

export default class PaymentCreateRequests extends BaseRequest {
    
    async postPaymentCreate(status: number, body: object): Promise<APIResponse> {
        const url = `${(this.baseUrl)}${paths.paths.payment_create}`;

        return await this.post(url, status, body);
    }
}