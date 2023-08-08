import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequests.request";
import paths from '../api.json'

export default class UserRequests extends BaseRequest {
    async getClubs(status: number, parameters: object): Promise<APIResponse> {
        const url = `${(this.baseUrl)}${paths.paths.clubs}`;
        
        return await this.get(url, status, parameters);
    }

    async getUsers(status: number, parameters: object, userId: number ): Promise<APIResponse> {
        const url = `${(this.baseUrl)}${paths.paths.users}/${userId}`;
        
        return await this.get(url, status, parameters);
    }

    async postCreateUser(status: number, body: object): Promise<APIResponse> {
        const url = `${(this.baseUrl)}${paths.paths.users}`;

        return await this.post(url, status, body);
    }
}