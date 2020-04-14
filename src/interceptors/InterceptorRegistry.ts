import { Log } from '@/components/util';
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import IInterceptor from './IInterceptor';


export default class InterceptorRegistry {

    
    public static interceptors: IInterceptor[] = [];


    public static addInterceptor(interceptor: IInterceptor) {
        if (!process.env.VUE_APP_ENABLE_INTERCEPTORS) {
            Log.info('Interceptors disabled. Ignoring Interceptor registeration.');
            return;
        }

        this.interceptors.push(interceptor);
        axios.interceptors.response.use(
            InterceptorRegistry.DEFAULT_RESPONSE_INTERCEPTOR, 
            (error: AxiosError) => interceptor.rejectedPromiseHandler(error)
        );
    }


    public static getInterceptorByUrl(url: string | undefined): IInterceptor | undefined {
        if (!url) {
            return;
        }

        for (const i of InterceptorRegistry.interceptors) {
            for (const u of i.interceptConfigs) {
                if (url.indexOf(u.url) > -1) {
                    return i;
                }
            }
        }
    }


    private static DEFAULT_RESPONSE_INTERCEPTOR = (response: AxiosResponse): any => {
        return response;
    }


}


axios.interceptors.request.use((config: AxiosRequestConfig): any => {
    const interceptor = InterceptorRegistry.getInterceptorByUrl(config.url);

    if (process.env.VUE_APP_ENABLE_INTERCEPTORS && interceptor) {
        config.url = 'http://localhost:0' + interceptor.getMatchingUrl(config.url || '');
    }

    return config;
});


