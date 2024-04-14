import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequest.request";
import paths from '../api.json'

export default class GroupTrainingCategoriesRequests extends BaseRequest {
    
    async getGroupTrainingCategories(status: number, parameters: object): Promise<APIResponse> {
        const url = `${(this.baseUrl)}${paths.paths.groupTrainingCategories}`;
        
        return await this.get(url, status, parameters);
    }

    
}