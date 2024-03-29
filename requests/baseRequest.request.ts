import {APIRequestContext, APIResponse, expect} from "@playwright/test";
import paths from "../api.json"
import { log } from "@utils/logger";

export default class BaseRequest {
    protected baseUrl: string;

    constructor(
        protected request: APIRequestContext,
        private token = paths.tokens.test
    ) {
      this.baseUrl = paths.urls.base_url_api
    }
 
     async get(url: string, status: number, parameters?: any): Promise<APIResponse> {
        log('request url', url);
        log('request parameters', parameters);
        const response = await this.request.get(url, {headers: {'Authorization': this.token}, params: parameters });
        log("response status", await response.status());
        log("response body", JSON.stringify(await response.json(), null, '\t'));

        expect(response.status()).toEqual(status);

        return response;
    }

    async post(url: string, status: number, requestBody?: any): Promise<APIResponse> {
        log('request url', url);
        log("request body", JSON.stringify(await requestBody, null,'\t'));
        const response = await this.request.post(url, { headers: {'Authorization': this.token}, data: requestBody });
        log("response status", await response.status());
        log("response body", JSON.stringify(await response.json(), null,'\t'));

        expect(response.status()).toEqual(status);

        return response;
    }
}
