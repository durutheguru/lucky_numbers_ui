import { Web } from '@/components/util';
import PageRequest from '@/components/core/PageRequest';
// import '@/interceptors/back-office/users/BackOfficeUsersInterceptor';



export default class BackOfficeUserService {

    
    public static getBackOfficeUsers(
        pageRequest: PageRequest,
        successHandler: (response: any) => any,
        errorHandler?: (error: any) => any
    ) {
        if (pageRequest.URL) {
            Web.getAbsolute(pageRequest.URL + '&projection=backOfficeUserDetails', successHandler, errorHandler);
        } else {
            Web.get(
                '/api/v1/back_office_user?projection=backOfficeUserDetails&page=' 
                    + pageRequest.page + '&size=' + pageRequest.size, 
                successHandler, 
                errorHandler
            );
        }
    }


    public static searchBackOfficeUsers(
        query: string, 
        pageRequest: PageRequest, 
        successHandler: (response: any) => any, 
        errorHandler?: (error: any) => any
    ) {
        if (pageRequest.URL) {
            Web.getAbsolute(pageRequest.URL + '&projection=backOfficeUserDetails', successHandler, errorHandler);
            return;
        }

        Web.get(
            '/api/v1/back_office_user/search/searchUsers?projection=backOfficeUserDetails&name=' 
            + query + '&username=' + query + '&page=' + pageRequest.page + '&size=' + pageRequest.size, 
            successHandler, errorHandler
        );
    }


    public static createBackOfficeUser(
        user: any, 
        successHandler: (response: any) => any,
        errorHandler?: (error: any) => any
    ) {
        Web.post(
            '/api/v1/back_office_user', user, 
            successHandler, errorHandler
        );
    }


}

