import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequests.request";
import paths from '../api.json'

export default class CreateUserRequests extends BaseRequest {
    async postCreateUser(status: number, body: object): Promise<APIResponse> {
        const url = `${(this.baseUrl)}${paths.paths.users}`;

        return await this.post(url, status, body);
    }
}