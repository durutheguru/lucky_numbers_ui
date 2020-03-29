import { Web } from '../../components/util';


export default class LoginService {

    public static initiate(
        credentials: any, successHandler: (response: any) => any, errorHandler?: (error: any) => any,
    ) {
        Web.post(
            '/login', credentials, successHandler, errorHandler,
        );
    }

}
