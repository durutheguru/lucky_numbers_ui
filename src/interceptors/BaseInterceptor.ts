import { AxiosError } from 'axios';
import IInterceptor from './IInterceptor';
import InterceptConfig from '@/interceptors/InterceptConfig';



export default class BaseInterceptor implements IInterceptor {


    public interceptConfigs: InterceptConfig[] = [];


    public rejectedPromiseHandler(error: AxiosError): any {
        error.config.url = error.config.url || '';
        const intercept = this.getMatchingInterceptConfig(error.config?.url);
    
        if (intercept) {
            const body = (intercept.response as any).default.body;
            const headers = (intercept.response as any).default.headers;
    
            return Promise.resolve({
                status: 200,
                statusText: 'OK',
                data: body,
                headers,
                config: error.config
            });
        }
    }


    public getMatchingUrl(url: string): string | undefined {
        const intercept = this.getMatchingInterceptConfig(url);
        if (intercept) {
            return intercept.url;
        }
    }


    private getMatchingInterceptConfig(url: string): InterceptConfig | null {
        const intercept = this.interceptConfigs.filter((config: InterceptConfig) => {
            return url.indexOf(config.url) > -1;
        });

        if (intercept.length) {
            return intercept[0];
        }
        
        return null;
    }


}



