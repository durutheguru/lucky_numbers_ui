import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Log from '@/components/util/Log';
import IInterceptor from './IInterceptor';


export default class InterceptorRegistry {

    public static interceptors: IInterceptor[] = [];

    public static BASE_URL: string = process.env.VUE_APP_BASE_URL;

    private static mock: MockAdapter = new MockAdapter(axios, { onNoMatch: 'passthrough' });


    public static register(interceptor: IInterceptor) {
        if (!process.env.VUE_APP_ENABLE_INTERCEPTORS) {
            Log.info('Interceptors disabled. Ignoring Interceptor registration.');
            return;
        }

        for (const config of interceptor.interceptConfigs) {
            switch (config.method) {
                case 'GET': {
                    Log.info('Registering GET handler for ' + InterceptorRegistry.BASE_URL + config.url);
                    InterceptorRegistry.mock
                        .onGet(InterceptorRegistry.BASE_URL + config.url)
                        .reply(
                            config.response.status, 
                            config.response.body,
                            config.response.headers
                        );
                    break;
                }

                case 'POST': {
                    Log.info('Registering POST handler for ' + InterceptorRegistry.BASE_URL + config.url);
                    InterceptorRegistry.mock
                        .onPost(InterceptorRegistry.BASE_URL + config.url)
                        .reply(
                            config.response.status, 
                            config.response.body,
                            config.response.headers
                        );
                    break;
                }
            }
        }

        this.interceptors.push(interceptor);
    }


    // public static getInterceptorByUrl(url: string | undefined): IInterceptor | undefined {
    //     if (!url) {
    //         return;
    //     }

    //     for (const i of InterceptorRegistry.interceptors) {
    //         for (const u of i.interceptConfigs) {
    //             if (url.indexOf(u.url) > -1) {
    //                 return i;
    //             }
    //         }
    //     }
    // }


}


// const DEFAULT_RESPONSE_INTERCEPTOR = (response: AxiosResponse): any => {
//     return response;
// };


// axios.interceptors.request.use((config: AxiosRequestConfig): any => {
//     const interceptor = InterceptorRegistry.getInterceptorByUrl(config.url);

//     if (process.env.VUE_APP_ENABLE_INTERCEPTORS && interceptor) {
//         const relativeUrlPath = config.url || '';
//         // config.url = 'http://localhost:0' + interceptor.getMatchingUrl(relativeUrlPath);

//         // axios.interceptors.response.use(
//         //     DEFAULT_RESPONSE_INTERCEPTOR, 
//         //     (error: AxiosError) => { 
//         //         if (interceptor.hasMatchingUrl(relativeUrlPath)) {
//         //             interceptor.rejectedPromiseHandler(error);
//         //         }
//         //     }
//         // );

//     }

//     return config;
// });


