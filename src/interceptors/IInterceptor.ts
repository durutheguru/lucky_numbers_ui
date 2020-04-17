import { AxiosError } from 'axios';
import InterceptConfig from './InterceptConfig';


export default interface IInterceptor {

    interceptConfigs: InterceptConfig[];

    rejectedPromiseHandler: (error: AxiosError) => any;

    getMatchingUrl: (url: string) => string | undefined;

}


