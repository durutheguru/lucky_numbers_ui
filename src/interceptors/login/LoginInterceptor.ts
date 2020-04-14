import InterceptConfig from '@/interceptors/InterceptConfig';
import * as data from '@/interceptors/login/login-responses.json';
import BaseInterceptor from '../BaseInterceptor';
import InterceptorRegistry from '../InterceptorRegistry';



export default class LoginInterceptor extends BaseInterceptor {


    public interceptConfigs: InterceptConfig[] = [
        {
            url: '/login',
            type: 'success',
            response: data.default
        }
    ];


}


InterceptorRegistry.addInterceptor(new LoginInterceptor());

