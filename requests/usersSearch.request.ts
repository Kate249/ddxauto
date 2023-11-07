import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequest.request";
import paths from '../api.json';

export default class UsersSearchRequests extends BaseRequest {
    
    async postUsersSearch (status: number, body: object): Promise<APIResponse> {
        const url = `${(this.baseUrl)}${paths.paths.users_search}`;

        return await this.post(url, status, body);
    }
}