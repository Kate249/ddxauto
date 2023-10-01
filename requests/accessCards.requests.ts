import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequest.request";
import paths from '../api.json';

export default class AccessCardRequests extends BaseRequest {
    async postAccessCard(status: number, body: object): Promise<APIResponse> {
        const url = `${(this.baseUrl)}${paths.paths.accessCards}`;

        return await this.post(url, status, body);
    }

    async getAccessCardById(status: number, parameters: object, accessCardId: number): Promise<APIResponse> {
        const url = `${(this.baseUrl)}${paths.paths.accessCards}/${accessCardId}`;
        
        return await this.get(url, status, parameters);
    }
}