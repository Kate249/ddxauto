import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequest.request";
import paths from '../api.json';

export default class DiscountsRequest extends BaseRequest {
   
    async getDiscounts(status: number, parameters: object): Promise<APIResponse> {
        const url = `${(this.baseUrl)}${paths.paths.discounts}`;
        
        return await this.get(url, status, parameters);
    }
}