import { Web } from '../../components/util';
import '@/interceptors/login/LoginInterceptor';


export default class LoginService {

    public static initiate(
        credentials: any, successHandler: (response: any) => any, errorHandler?: (error: any) => any,
    ) {
        Web.post(
            '/login', credentials, successHandler, errorHandler,
        );
    }

}

