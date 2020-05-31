import axios, { AxiosRequestConfig } from 'axios';
import store from '../../store';
import { Constants } from '.';


axios.interceptors.request.use(
    (config: AxiosRequestConfig): any => {
        const matchingExcludePaths = Constants.authExcludeApiPaths.filter((value: string, index: number) => {
            config.url = config.url || '';
            return config.url.indexOf(value) > -1;
        });

        if (matchingExcludePaths.length === 0 && config.url?.startsWith(process.env.VUE_APP_BASE_URL)) {
            config.headers.Authorization = store.getters['authToken/apiToken'];
        }

        return config;
    },
);


export type APISuccessCallback = (response: any) => any;
export type APIErrorCallback = (error: any) => any;


export default class Web {


    public static BASE_URL: string = process.env.VUE_APP_BASE_URL;


    public static get(
        url: string, successCallback: APISuccessCallback, errorCallback?: APIErrorCallback,
    ) {
        Web.getAbsolute(Web.BASE_URL + url, successCallback, errorCallback);
    }


    public static getAbsolute(
        url: string, successCallback: APISuccessCallback, errorCallback?: APIErrorCallback,
    ) {
        axios.get(url)
        .then(successCallback)
        .catch(errorCallback);
    }


    public static post(
        url: string, data: any, successCallback: APISuccessCallback, errorCallback?: APIErrorCallback,
    ) {
        Web.postAbsolute(Web.BASE_URL + url, data, successCallback, errorCallback);
    }


    public static postAbsolute(
        url: string, data: any, successCallback: APISuccessCallback, errorCallback?: APIErrorCallback,
    ) {
        axios.post(url, data)
        .then(successCallback)
        .catch(errorCallback);
    }


    public static navigate(url: string) {
        window.location.href = url;
    }


}
