import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequest.request";
import paths from '../api.json';

export default class ProductsRequest extends BaseRequest {
   
    async getProducts(status: number, parameters: object): Promise<APIResponse> {
        const url = `${(this.baseUrl)}${paths.paths.products}`;
        
        return await this.get(url, status, parameters);
    }
}