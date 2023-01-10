import axios, { AxiosRequestConfig, AxiosResponse, Method, RawAxiosRequestHeaders } from "axios";
import { appendFile, writeFile } from "fs";

import { readFile } from "fs/promises";
import { join } from "path";
import { Agent } from "https";
class SupportedApps {

    protected method: Method = "GET";
    protected error: any;

    public config: any;

    constructor(config: any) {
        this.config = config;
    }

    async appTest(url: string, attrs: RawAxiosRequestHeaders, overridevars: AxiosRequestConfig | null = null): Promise<object> {

        // If the URL is invalid, empty, or undefined
        if (!url || url === '' || url === undefined) {
            return {
                code: 404,
                status: "No URL has been specified",
                response: "No URL has been specified"
            }
        };

        // Make the request to the URL
        const res = await this.execute(url, attrs, overridevars);

        // If res is null then return an error
        if (res == null) {
            return {
                code: 404,
                status: this.error,
                response: "Connection failed"
            }
        }

        let status = null;

        switch (res.status) {
            case 200:
                status = "Successfully communicated with the API";
                break;
            case 401:
                status = "Failed: Invalid credentials";
                break;
            case 404:
                status = "Failed: Please make sure your URL is correct and that there is a trailing slash";
                break;
            default:
                status = "Something went wrong... Code: " + res.status;
                break;
        }
     
        return {
            code: res.status,
            status: status,
            response: res.data
        }
    }

    async execute(url: string, attrs: RawAxiosRequestHeaders, overridevars: AxiosRequestConfig | null = null, overridemethod: Method | null = null, disableTLS: Boolean = false): Promise<AxiosResponse | null> {

        let res = null;

        const vars: AxiosRequestConfig = (overridevars == null) ? {
            timeout: 15000
        } : overridevars;

        const method: Method = (overridemethod == null) ? this.method : overridemethod;

        const config: AxiosRequestConfig = {
            url: url,
            headers: attrs,
            method: method,
            ...vars
        }

        if (disableTLS) {
            config.httpsAgent = new Agent({
                rejectUnauthorized: false
            });
        }

        try {
            return await axios(config)
        } catch (error: any) {
            // writeFile(join(__dirname, 'error.json'), JSON.stringify(error), (err) => { });
            this.error = error;
        }

        return res;
    }

    public async getLiveStats(data: any): Promise<string> {
        let className = this.constructor.name;
        let file = '/' + className + '/livestats.blade.html';

        let template = await readFile(join(__dirname, file), 'utf8');

          
        for (let key in data) {
            template = template.replace(`{{ ${key} }}`, data[key]);
            template = template.replace(`{{${key}}}`, data[key]);
        }

        return template;
    }

    normaliseurl(url: string, addslash: boolean = true): string {
        if (url.endsWith('/')) url = url.slice(0, -1);
        if (addslash) url += '/';
    
        return url;
    }
}

export default SupportedApps;