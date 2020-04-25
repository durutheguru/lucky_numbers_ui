import { Web } from '@/components/util';



export default class UserService {

    
    public static getBackOfficeUsers(
        page: number, 
        size: number, 
        successHandler: (response: any) => any,
        errorHandler?: (error: any) => any
    ) {
        Web.get(
            '/api/v1/back_office_user?page=' + page + '&size=' + size, successHandler, errorHandler
        );
    }


}

